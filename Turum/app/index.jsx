import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function TwoCirclesVector({
  size = 180,
  radius = 45,
  orbit = 45,
  colorA = '#4CAF7C',
  colorB = '#A8E6CF',
  shadowOpacity = 1,
  speed = 1,
  style,
}) {
  const [angle, setAngle] = useState(0);
  const raf = useRef(null);
  const last = useRef(null);

  useEffect(() => {
    const step = (t) => {
      if (last.current == null) last.current = t;
      const dt = (t - last.current) / 1000;
      last.current = t;
      const delta = dt * speed * Math.PI * 2 * 0.1;
      setAngle((a) => (a + delta) % (Math.PI * 2));
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      last.current = null;
    };
  }, [speed]);

  const cx = 100;
  const cy = 100;
  const x1 = cx + orbit * Math.cos(angle);
  const y1 = cy + orbit * Math.sin(angle);
  const x2 = cx + orbit * Math.cos(angle + Math.PI);
  const y2 = cy + orbit * Math.sin(angle + Math.PI);

  const trailLength = 30;
  const halfCircle = Math.PI;
  const trail = Array.from({ length: trailLength }, (_, i) => {
    const decay = (i + 1) / trailLength;
    return {
      x1: cx + orbit * Math.cos(angle - decay * halfCircle),
      y1: cy + orbit * Math.sin(angle - decay * halfCircle),
      x2: cx + orbit * Math.cos(angle + Math.PI - decay * halfCircle),
      y2: cy + orbit * Math.sin(angle + Math.PI - decay * halfCircle),
      opacity: shadowOpacity * (1 - decay),
    };
  });

  return (
    <View style={[styles.container, style]}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        {trail.map((p, i) => (
          <React.Fragment key={i}>
            <Circle cx={p.x1} cy={p.y1} r={radius} fill={colorA} opacity={p.opacity} />
            <Circle cx={p.x2} cy={p.y2} r={radius} fill={colorB} opacity={p.opacity} />
          </React.Fragment>
        ))}

        <Circle cx={x1} cy={y1} r={radius} fill={colorA} />
        <Circle cx={x2} cy={y2} r={radius} fill={colorB} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});