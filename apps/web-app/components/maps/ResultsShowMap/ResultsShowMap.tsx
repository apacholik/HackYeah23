import { useQuery } from "@tanstack/react-query";
import { type Point, GeoJson, GeoJsonFeature, Map as PidgeonMap, Overlay, ZoomControl } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { type ComponentPropsWithoutRef, useCallback, useLayoutEffect, useState } from "react";
import type { VariantProps } from "tailwind-variants";
import { Person } from "ui/components/icons";

import { USER_LOCATION_MARKER_SIZE, USER_MARKER_CONFIG } from "../../../constants/maps";
import { apiClient } from "../../../helpers";
import { useLocationCoords, useLocationIsEnabled } from "../../../stores/locationStore";
import type { SearchBoundingBox } from "../../../types/animalCoords";
import type { EncounterDetails } from "../../../types/encounterDetails";
import type EncounterTypeResponse from "../../../types/EncounterTypeResponse";
import * as styles from "./ResultsShowMap.styled";

type Props = {
  isWild: boolean,
  encounterTypes: EncounterTypeResponse[],
  defaultEncounterType?: string,
} & VariantProps<typeof styles.resultsShowMap>;

// TODO: Those values to be altered
const MAP_DEFAULT_WIDTH = 640;
const MAP_DEFAULT_HEIGHT = 480;

const INITIAL_ZOOM = 14;
const SPOTTED_POINT_RANGE = 1;
const SPOTTED_POINT_RANGE_ZOOM_RATIO = 1.25;

/** Map presenting places where users spotted missing animals */
export function ResultsShowMap({
    isWild,
    encounterTypes,
    defaultEncounterType = '', 
    ...restProps
  }: Props) {
  const locationCoords = useLocationCoords();
  const isLocationEnabled = useLocationIsEnabled();

  const [searchBoundingBox, setSearchBoundingBox] = useState<SearchBoundingBox | undefined>(undefined);

  const { data: queryData } = useQuery<EncounterDetails[]>({
    queryKey: [
      "PostEncounter", 
      isWild, 
      searchBoundingBox?.maxLatitude,
      searchBoundingBox?.minLatitude,
      searchBoundingBox?.maxLongitude,
      searchBoundingBox?.minLongitude,
      defaultEncounterType
    ],
    keepPreviousData: true,
    enabled: isLocationEnabled && (searchBoundingBox !== undefined),
    queryFn: async () => {
      const response = await apiClient.post("Encounter", {
        ...searchBoundingBox,
        encounterType: defaultEncounterType,
        isWild
      });

      return response.data;
    },
  });

  console.log({ encounterTypes, queryData });

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

  if (locationCoords == null || !isLocationEnabled) {
    return null;
  }

  return (
    <div className={styles.resultsShowMap(restProps)}>
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
        minZoom={INITIAL_ZOOM - 2}
        maxZoom={INITIAL_ZOOM + 4}
        defaultWidth={MAP_DEFAULT_WIDTH}
        height={MAP_DEFAULT_HEIGHT}
      >
        {/* ANIMAL SPOTTING POINT IN FORM OF GEOJSON */}
        {queryData?.map(({ encounterType, timeUtc, latitude, longitude }) => {
          return (
            <GeoJson
              key={timeUtc + encounterType}
              svgAttributes={{
                fill: "var(--tw-ring-color)",
                strokeWidth: "2",
                stroke: "var(--tw-ring-color)",
                r: (SPOTTED_POINT_RANGE * zoom * SPOTTED_POINT_RANGE_ZOOM_RATIO).toString(),
              }}
            >
              <GeoJsonFeature feature={{
                type: "Feature",
                geometry: { type: "Point", coordinates: [longitude, latitude] }
              }} />
            </GeoJson>
          )
        })}

        {/* USER MARKER */}
        <Overlay anchor={[locationCoords.lat, locationCoords.lng]} offset={[USER_LOCATION_MARKER_SIZE / 2, USER_LOCATION_MARKER_SIZE / 2]}>
          <Person 
            style={USER_MARKER_CONFIG}
          />
        </Overlay>

        <ZoomControl />
      </PidgeonMap>
    </div>
  );
}
