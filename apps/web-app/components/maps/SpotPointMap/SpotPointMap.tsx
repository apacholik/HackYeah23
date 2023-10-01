import { type Point, GeoJson, GeoJsonFeature, Map as PidgeonMap, Overlay, ZoomControl } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { type ComponentPropsWithoutRef, useCallback, useLayoutEffect, useState } from "react";
import type { VariantProps } from "tailwind-variants";
import { Person } from "ui/components/icons";

import { USER_LOCATION_MARKER_SIZE, USER_MARKER_CONFIG } from "../../../constants/maps";
import { useLocationCoords, useLocationIsEnabled } from "../../../stores/locationStore";
import type { AnimalCoordsInfo } from "../../../types/animalCoords";
import * as styles from "./SpotPointMap.styled";

type Props = {
  onAnimalMarkerMove?: ({ lat, lng }: { lat: number; lng: number }) => void;
} & VariantProps<typeof styles.spotPointMap>;

// TODO: Those values to be altered
const MAP_DEFAULT_WIDTH = 640;
const MAP_DEFAULT_HEIGHT = 480;

const INITIAL_ZOOM = 16;
const SPOTTED_POINT_RANGE = 1;
const SPOTTED_POINT_RANGE_ZOOM_RATIO = 1.25;

/** Map to be used with spotting form */
export function SpotPointMap({ onAnimalMarkerMove = () => undefined, ...restProps }: Props) {
  const locationCoords = useLocationCoords();
  const isLocationEnabled = useLocationIsEnabled();

  const [animalCoords, setAnimalCoords] = useState<AnimalCoordsInfo | undefined>(undefined);

  const geoJsonFeatureSample =
    animalCoords != null
      ? {
          type: "Feature",
          geometry: { type: "Point", coordinates: animalCoords.point },
        }
      : undefined;

  const [mapState, setRawMapState] = useState({
    center: undefined as Point | undefined,
    zoom: INITIAL_ZOOM,
  });

  const { center, zoom } = mapState;

  const setAnimalCoordsAndEmitCallback = useCallback(
    (nextAnimalCoords: typeof animalCoords) => {
      setAnimalCoords(nextAnimalCoords);
      if (nextAnimalCoords?.point) {
        onAnimalMarkerMove({ lat: nextAnimalCoords.point[1], lng: nextAnimalCoords.point[0] });
      }
    },
    [onAnimalMarkerMove]
  );

  const setMapState = useCallback(
    (stateChanges: Partial<typeof mapState>) => setRawMapState({ ...mapState, ...stateChanges }),
    [mapState]
  );

  const handleMapClick = ({ latLng }: { latLng: Point }) => {
    setAnimalCoordsAndEmitCallback({ point: [latLng[1], latLng[0]], r: SPOTTED_POINT_RANGE });
  };

  const handleUserLocationMarkerClick = () => {
    if (locationCoords) {
      setAnimalCoordsAndEmitCallback({ point: [locationCoords.lng, locationCoords.lat], r: SPOTTED_POINT_RANGE });
    }
  };

  const handleBoundsChange = ({
    center,
    zoom,
  }: Parameters<NonNullable<ComponentPropsWithoutRef<typeof PidgeonMap>["onBoundsChanged"]>>[0]) => {
    setMapState({ center, zoom });
  };

  useLayoutEffect(
    function grabInitialLocationCoords() {
      if (locationCoords != null && mapState.center == null) {
        setMapState({ center: [locationCoords.lat, locationCoords.lng] });
        setAnimalCoordsAndEmitCallback({ point: [locationCoords.lng, locationCoords.lat], r: SPOTTED_POINT_RANGE });
      }
    },
    [locationCoords, mapState.center, setMapState, setAnimalCoordsAndEmitCallback]
  );

  useLayoutEffect(
    function resetAnimalCoordsAfterUserDisablesLocation() {
      if (!isLocationEnabled) {
        setAnimalCoords(
          locationCoords ? { point: [locationCoords.lng, locationCoords.lat], r: SPOTTED_POINT_RANGE } : undefined
        );
      }
    },
    [isLocationEnabled, locationCoords]
  );

  if (locationCoords == null || !isLocationEnabled) {
    return null;
  }

  return (
    <div className={styles.spotPointMap(restProps)}>
      <PidgeonMap
        limitBounds="edge"
        center={center}
        zoom={zoom}
        provider={osm}
        dprs={[1, 2]}
        onClick={handleMapClick}
        onBoundsChanged={handleBoundsChange}
        animate
        zoomSnap={true}
        metaWheelZoom={false}
        twoFingerDrag={false}
        mouseEvents
        touchEvents
        minZoom={INITIAL_ZOOM - 5}
        maxZoom={INITIAL_ZOOM + 2}
        defaultWidth={MAP_DEFAULT_WIDTH}
        height={MAP_DEFAULT_HEIGHT}
      >
        {/* ANIMAL SPOTTING POINT IN FORM OF GEOJSON */}
        {geoJsonFeatureSample != null && (
          <GeoJson
            svgAttributes={{
              fill: "var(--tw-ring-color)",
              strokeWidth: "2",
              stroke: "var(--tw-ring-color)",
              r: (SPOTTED_POINT_RANGE * zoom * SPOTTED_POINT_RANGE_ZOOM_RATIO).toString(),
            }}
          >
            <GeoJsonFeature feature={geoJsonFeatureSample} />
          </GeoJson>
        )}

        {/* USER MARKER */}
        <Overlay
          anchor={[locationCoords.lat, locationCoords.lng]}
          offset={[USER_LOCATION_MARKER_SIZE / 2, USER_LOCATION_MARKER_SIZE / 2]}
        >
          <Person style={USER_MARKER_CONFIG} onClick={handleUserLocationMarkerClick} />
        </Overlay>

        <ZoomControl />
      </PidgeonMap>
    </div>
  );
}
