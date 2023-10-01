import { useQuery } from "@tanstack/react-query";
import { type Point, Map as PidgeonMap, Overlay, ZoomControl } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { type ComponentPropsWithoutRef, useCallback, useLayoutEffect, useState } from "react";
import type { VariantProps } from "tailwind-variants";
import { Person } from "ui/components/icons";

import { USER_LOCATION_MARKER_SIZE, USER_MARKER_CONFIG } from "../../../constants/maps";
import { apiClient } from "../../../helpers";
import { useLocationActions,useLocationCoords, useLocationIsEnabled } from "../../../stores/locationStore";
import type { SearchBoundingBox } from "../../../types/animalCoords";
import type { EncounterDetails } from "../../../types/encounterDetails";
import type EncounterTypeResponse from "../../../types/EncounterTypeResponse";
import { Select } from "../../atoms";
import * as styles from "./ResultsShowMap.styled";

type Props = {
  isWild: boolean,
  encounterTypes: EncounterTypeResponse[],
  defaultEncounterType?: string,
} & VariantProps<typeof styles.resultsShowMap>;

// TODO: Those values to be altered
const MAP_DEFAULT_HEIGHT = 480;

const ALL_ENCOUNTERS_CODE = "All";
const ALL_ENCOUNTERS_DISPLAY_NAME = "Wszystkie zdarzenia";

const INITIAL_ZOOM = 15;

/** Map presenting places where users spotted missing animals */
export function ResultsShowMap({
    isWild,
    encounterTypes,
    defaultEncounterType = ALL_ENCOUNTERS_CODE, 
    ...restProps
  }: Props) {
  const locationActions = useLocationActions();
  const locationCoords = useLocationCoords();
  const isLocationEnabled = useLocationIsEnabled();

  const [searchBoundingBox, setSearchBoundingBox] = useState<SearchBoundingBox | undefined>(undefined);
  const [selectedEncounter, setSelectedEncounter] = useState<EncounterDetails | undefined>(undefined);
  const [selectedEncounterCode, setSelectedEncounterCode] = useState(defaultEncounterType);

  const { data: queryData } = useQuery<EncounterDetails[]>({
    queryKey: [
      "PostEncounter", 
      isWild, 
      searchBoundingBox?.maxLatitude,
      searchBoundingBox?.minLatitude,
      searchBoundingBox?.maxLongitude,
      searchBoundingBox?.minLongitude,
      selectedEncounterCode
    ],
    keepPreviousData: true,
    enabled: isLocationEnabled && (searchBoundingBox !== undefined),
    queryFn: async () => {
      const response = await apiClient.post("Encounter", {
        ...searchBoundingBox,
        encounterType: selectedEncounterCode === ALL_ENCOUNTERS_CODE ? '' : selectedEncounterCode,
        isWild
      });

      return response.data;
    },
  });

  const [mapState, setRawMapState] = useState({
    center: undefined as Point | undefined,
    zoom: INITIAL_ZOOM,
  });

  const { center, zoom } = mapState;

  const setMapState = useCallback((stateChanges: Partial<typeof mapState>) => setRawMapState({ ...mapState, ...stateChanges }), [mapState]);

  const handleBoundsChange = (
    details: Parameters<NonNullable<ComponentPropsWithoutRef<typeof PidgeonMap>['onBoundsChanged']>>[0]
  ) => {
    const { center, zoom, bounds } = details;
    
    setSearchBoundingBox({
      minLatitude: bounds.sw[0],
      maxLatitude:  bounds.ne[0],
      minLongitude: bounds.sw[1],
      maxLongitude: bounds.ne[1],
    });

    setMapState({ center, zoom });
  };

  useLayoutEffect(function grabInitialLocationCoords() {
    if (locationCoords != null && mapState.center == null) {
      setMapState({ center: [locationCoords.lat, locationCoords.lng] });
    }
  }, [locationCoords, mapState.center, setMapState]);

  useLayoutEffect(function onUnmount() {
    return () => {
      setSelectedEncounter(undefined);
    }
  }, [])

  if (locationCoords == null || !isLocationEnabled) {
    return (
      <div>
        Potrzebujemy Twoich współrzędnych.{" "}
        <span
          className="bg-green-100 rounded-md p-1 px-2 hover:bg-green-300 cursor-pointer"
          onClick={locationActions.enable}
        >
          Aktywuj
        </span>
      </div>
    );
  }

  return (
    <div className={styles.resultsShowMap(restProps)}>
      <div className="w-4/12 flex flex-col gap-4">
        <div>
          <Select.Root 
            value={selectedEncounterCode}
            onValueChange={(v) => {
              setSelectedEncounterCode(v);
              setSelectedEncounter(undefined);
            }}
          >
            <Select.SelectTrigger>
              <Select.SelectValue placeholder={ALL_ENCOUNTERS_DISPLAY_NAME} />
            </Select.SelectTrigger>

            <Select.SelectContent>
              <Select.SelectItem value="All">
                {ALL_ENCOUNTERS_DISPLAY_NAME}
              </Select.SelectItem>

              {encounterTypes.map((encounterType) => (
                <Select.SelectItem key={encounterType.id} value={encounterType.code}>
                  {encounterType.code}
                </Select.SelectItem>
              ))}
            </Select.SelectContent>
          </Select.Root>
        </div>

        <div>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors first:mt-0">Szczegóły zdarzenia</h3>
          
          {!selectedEncounter ? 
            <p>Kliknij w ikonę zwierzęcia by wyświetlić</p> :
            <div>
              {
                !selectedEncounter.images.length || selectedEncounter.properties == null ?
                <p>Brak informacji o szczegółach zdarzenia...</p> :
                <div className="flex flex-col gap-4">
                  {selectedEncounter.properties != null && <div>
                    {selectedEncounter.properties.map(({ name, value, valueType }) => {
                      return <p key={valueType}><strong>{name}:</strong> {value}</p>
                    })}
                  </div>}

                  {selectedEncounter.images.map((src) => 
                    <img key={src} src={src} alt="" width="100%" height="auto" />
                  )}
                </div>
              }
            </div>
          }
        </div>
      </div>

      <div className="w-8/12 shrink-0">
        <PidgeonMap
          limitBounds="edge"
          center={center}
          zoom={zoom}
          provider={osm}
          dprs={[1, 2]}
          onBoundsChanged={handleBoundsChange}
          animate
          zoomSnap={true}
          metaWheelZoom={false}
          twoFingerDrag={false}
          mouseEvents
          touchEvents
          minZoom={INITIAL_ZOOM - 3}
          maxZoom={INITIAL_ZOOM + 3}
          height={MAP_DEFAULT_HEIGHT}
        >
          {/* ANIMAL SPOTTING POINT IN FORM OF EMOJI */}
          {queryData?.map((encounter) => {
            const { encounterType, timeUtc, latitude, longitude, propabilityOfOccurance } = encounter;
    
            const key = timeUtc + encounterType;

            const selectedEncounterKey = selectedEncounter != null ? 
              selectedEncounter.timeUtc + selectedEncounter.encounterType
              : undefined;

            const scaleRatio = (propabilityOfOccurance / 100) * 1.75;

            return (
              <Overlay
                key={'overlay' + key}
                anchor={[latitude, longitude]}
                // NOTE: Not sure why this value suits...
                offset={[19.5 * scaleRatio, USER_LOCATION_MARKER_SIZE / 2]}
              >
                <span 
                  style={
                    {
                      fontSize: USER_LOCATION_MARKER_SIZE * scaleRatio,
                      cursor: "pointer",
                      lineHeight: 1,
                      borderRadius: "100%",
                      boxShadow: key === selectedEncounterKey ? "0px 0px 0px 0.5rem var(--tw-ring-color)" : undefined,
                    }
                  }
                  onClick={() => setSelectedEncounter(encounter)}
                >
                  { 
                    encounterType === "Kot" ? '🐱' : 
                    encounterType === "Pies" ? '🐶' :
                    encounterType === "Dzik" ? '🐗' :
                    '🐾'
                  }
                </span>
              </Overlay>
            )
          })}

          {/* USER MARKER */}
          <Overlay anchor={[locationCoords.lat, locationCoords.lng]} offset={[USER_LOCATION_MARKER_SIZE / 2, USER_LOCATION_MARKER_SIZE / 2]}>
            <Person 
              style={{...USER_MARKER_CONFIG, cursor: 'default'}}
            />
          </Overlay>

          <ZoomControl />
        </PidgeonMap>
      </div>
    </div>
  );
}
