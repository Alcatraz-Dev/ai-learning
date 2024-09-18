"use client";
import {useEffect, useRef, useState} from "react";
import {Color, Scene, Fog, PerspectiveCamera, Vector3} from "three";
import ThreeGlobe from "three-globe";
import {useThree, Object3DNode, Canvas, extend} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import countries from "@/data/globe.json";

declare module "@react-three/fiber" {
    interface ThreeElements {
        threeGlobe: Object3DNode<ThreeGlobe, typeof ThreeGlobe>;
    }
}

extend({ThreeGlobe});

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
    order: number;
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    arcAlt: number;
    color: string;
};

export type GlobeConfig = {
    pointSize?: number;
    globeColor?: string;
    showAtmosphere?: boolean;
    atmosphereColor?: string;
    atmosphereAltitude?: number;
    emissive?: string;
    emissiveIntensity?: number;
    shininess?: number;
    polygonColor?: string;
    ambientLight?: string;
    directionalLeftLight?: string;
    directionalTopLight?: string;
    pointLight?: string;
    arcTime?: number;
    arcLength?: number;
    rings?: number;
    maxRings?: number;
    initialPosition?: {
        lat: number;
        lng: number;
    };
    labelsData?: {
        lat: number;
        lng: number;
        text: string;
    }
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    labels?: boolean;
};

interface WorldProps {
    globeConfig: GlobeConfig;
    data: Position[];
}

let numbersOfRings = [0];

export function Globe({globeConfig, data}: WorldProps) {
    const [globeData, setGlobeData] = useState<
        | {
        size: number;
        order: number;
        color: (t: number) => string;
        lat: number;
        lng: number;
    }[]
        | null
    >(null);

    const globeRef = useRef<ThreeGlobe | null>(null);
    const [hoveredLabel, setHoveredLabel] = useState<{ lat: number; lng: number; text: string } | null>(null);
    const handlePointerOver = (label: { lat: number; lng: number; text: string }) => {
        setHoveredLabel(label);
    };

    const handlePointerOut = () => {
        setHoveredLabel(null);
    };
    const defaultProps = {
        pointSize: 1,
        atmosphereColor: "#ffffff",
        showAtmosphere: true,
        atmosphereAltitude: 0.1,
        polygonColor: "rgba(255,255,255,0.7)",
        globeColor: "#1d072e",
        emissive: "#000000",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        arcTime: 2000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        labels: true,
        labelsData: [
            {lat: 22.3193, lng: 114.1694, text: "Hong Kong", order: 1},
            {lat: 40.7128, lng: -74.0060, text: "New York", order: 1},
            {lat: 51.5074, lng: -0.1278, text: "London", order: 1},
            {lat: 35.6762, lng: 139.6503, text: "Tokyo", order: 1},
            {lat: -33.8688, lng: 151.2093, text: "Sydney", order: 1},
            // { lat: 48.8566, lng: 2.3522, text: "Paris", order: 1 },      // Added Paris
            {lat: 55.7558, lng: 37.6173, text: "Moscow", order: 1},    // Added Moscow
            {lat: 34.0522, lng: -118.2437, text: "Los Angeles", order: 1}, // Added Los Angeles
            {lat: -34.6037, lng: -58.3816, text: "Buenos Aires", order: 1}, // Added Buenos Aires
            {lat: 1.3521, lng: 103.8198, text: "Singapore", order: 1}, // Added Singapore
            {lat: 13.7563, lng: 100.5018, text: "Bangkok", order: 1},  // Added Bangkok
            {lat: -23.5505, lng: -46.6333, text: "São Paulo", order: 1}, // Added São Paulo
            {lat: 19.4326, lng: -99.1332, text: "Mexico City", order: 1}, // Added Mexico City
            // { lat: 37.7749, lng: -122.4194, text: "San Francisco", order: 1 }, // Added San Francisco
            {lat: 41.9028, lng: 12.4964, text: "Rome", order: 1},      // Added Rome
        ],
        autoRotate: true,
        autoRotateSpeed: 0.5,
        labelColor: "#FFFFFF",
        labelFont: "Helvetica",
        ...globeConfig,
    };

    useEffect(() => {
        if (globeRef.current) {
            _buildData();
            _buildMaterial();
        }
    }, [globeRef.current]);

    const _buildMaterial = () => {
        if (!globeRef.current) return;

        const globeMaterial = globeRef.current.globeMaterial() as unknown as {
            color: Color;
            emissive: Color;
            emissiveIntensity: number;
            shininess: number;
        };
        globeMaterial.color = new Color(globeConfig.globeColor);
        globeMaterial.emissive = new Color(globeConfig.emissive);
        globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
        globeMaterial.shininess = globeConfig.shininess || 0.9;
    };

    const _buildData = () => {
        const arcs = data;
        let points = [];
        for (let i = 0; i < arcs.length; i++) {
            const arc = arcs[i];
            const rgb = hexToRgb(arc.color) as { r: number; g: number; b: number };
            points.push({
                size: defaultProps.pointSize,
                order: arc.order,
                color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
                lat: arc.startLat,
                lng: arc.startLng,
            });
            points.push({
                size: defaultProps.pointSize,
                order: arc.order,
                color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
                lat: arc.endLat,
                lng: arc.endLng,
            });
        }

        // remove duplicates for same lat and lng
        const filteredPoints = points.filter(
            (v, i, a) =>
                a.findIndex((v2) =>
                    ["lat", "lng"].every(
                        (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"]
                    )
                ) === i
        );

        setGlobeData(filteredPoints);
    };

    useEffect(() => {
        if (globeRef.current && globeData) {
            globeRef.current
                .hexPolygonsData(countries.features)
                .hexPolygonResolution(3)
                .hexPolygonMargin(0.7)
                .showAtmosphere(defaultProps.showAtmosphere)
                .atmosphereColor(defaultProps.atmosphereColor)
                .atmosphereAltitude(defaultProps.atmosphereAltitude)
                .hexPolygonColor((e) => {
                    return defaultProps.polygonColor;
                });
            startAnimation();
        }
    }, [globeData]);

    const startAnimation = () => {
        if (!globeRef.current || !globeData) return;

        globeRef.current
            .arcsData(data)
            .arcStartLat((d) => (d as { startLat: number }).startLat * 1)
            .arcStartLng((d) => (d as { startLng: number }).startLng * 1)
            .arcEndLat((d) => (d as { endLat: number }).endLat * 1)
            .arcEndLng((d) => (d as { endLng: number }).endLng * 1)
            .arcColor((e: any) => (e as { color: string }).color)
            .arcAltitude((e) => {
                return (e as { arcAlt: number }).arcAlt * 1;
            })
            .arcStroke((e) => {
                return [0.32, 0.28, 0.3][Math.round(Math.random() * 2)];
            })
            .arcDashLength(defaultProps.arcLength)
            .arcDashInitialGap((e) => (e as { order: number }).order * 1)
            .arcDashGap(15)
            .arcDashAnimateTime((e) => defaultProps.arcTime);

        globeRef.current
            .pointsData(data)
            .pointColor((e) => (e as { color: string }).color)
            .pointsMerge(true)
            .pointAltitude(0.0)
            .pointRadius(2);

        globeRef.current
            .ringsData([])
            .ringColor((e: any) => (t: any) => e.color(t))
            .ringMaxRadius(defaultProps.maxRings)
            .ringPropagationSpeed(RING_PROPAGATION_SPEED)
            .ringRepeatPeriod(
                (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
            );

        // Ensure labelsData is an array before passing it
        if (defaultProps.labels && defaultProps.labelsData && Array.isArray(defaultProps.labelsData)) {

            globeRef.current
                .labelsData(defaultProps.labelsData) // labelsData is an array
                // @ts-ignore
                .labelLat((d) => d.lat)
                // @ts-ignore
                .labelLng((d) => d.lng)
                // @ts-ignore
                .labelText((d) => d.text)
                .labelColor(() => 'rgb(255,255,255)')
                .labelAltitude(0.01) // Adjust altitude to make labels float slightly above the globe
                .labelSize(2.5)
                .labelDotRadius(0.5)
                .labelResolution(2);
        }

    };

    useEffect(() => {
        if (!globeRef.current || !globeData) return;

        const interval = setInterval(() => {
            if (!globeRef.current || !globeData) return;
            numbersOfRings = genRandomNumbers(
                0,
                data.length,
                Math.floor((data.length * 4) / 5)
            );

            globeRef.current.ringsData(
                globeData.filter((d, i) => numbersOfRings.includes(i))
            );
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [globeRef.current, globeData]);

    return (
        <>
            <threeGlobe ref={globeRef}/>
        </>
    );
}

export function WebGLRendererConfig() {
    const {gl, size} = useThree();

    useEffect(() => {
        gl.setPixelRatio(window.devicePixelRatio);
        gl.setSize(size.width, size.height);
        gl.setClearColor(0xffaaff, 0);
    }, []);

    return null;
}

export function World(props: WorldProps) {
    const {globeConfig} = props;
    const scene = new Scene();
    scene.fog = new Fog(0xffffff, 400, 2000);
    return (
        <Canvas scene={scene} camera={new PerspectiveCamera(50, aspect, 180, 1800)}>
            <WebGLRendererConfig/>
            <ambientLight color={globeConfig.ambientLight} intensity={0.6}/>
            <directionalLight
                color={globeConfig.directionalLeftLight}
                position={new Vector3(-400, 100, 400)}
            />
            <directionalLight
                color={globeConfig.directionalTopLight}
                position={new Vector3(-200, 500, 200)}
            />
            <pointLight
                color={globeConfig.pointLight}
                position={new Vector3(-200, 500, 200)}
                intensity={0.8}
            />
            <Globe {...props} globeConfig={globeConfig} data={props.data}/>
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                minDistance={cameraZ}
                maxDistance={cameraZ}
                autoRotateSpeed={1}
                autoRotate={true}
                minPolarAngle={Math.PI / 3.5}
                maxPolarAngle={Math.PI - Math.PI / 3}
            />
        </Canvas>
    );
}

export function hexToRgb(hex: string) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
    const arr = [];
    while (arr.length < count) {
        const r = Math.floor(Math.random() * (max - min)) + min;
        if (arr.indexOf(r) === -1) arr.push(r);
    }

    return arr;
}
