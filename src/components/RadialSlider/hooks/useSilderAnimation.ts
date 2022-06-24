import { useState, useRef, useEffect } from 'react';
import {
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import {
  cartesianToPolar,
  getCurrentRadian,
  getRadianByValue,
  polarToCartesian,
} from '../../../utils/commonHelpers';
import type { RadialSliderAnimationHookProps } from '../types';
import useRadialSlider from './useRadialSlider';

interface StartCartesianProps {
  x: number;
  y: number;
}

const useSilderAnimation = (props: RadialSliderAnimationHookProps) => {
  const {
    step = 1,
    radius = 100,
    sliderWidth = 18,
    thumbRadius = 18,
    thumbBorderWidth = 5,
    disabled,
    min = 0,
    onChange = () => {},
    max = 100,
    onComplete = () => {},
  } = props;

  let moveStartValue: number;
  let startCartesian: StartCartesianProps;
  let moveStartRadian: number;
  const { radianValue } = useRadialSlider(props);
  const prevValue = useRef(props.value > min ? props.value : min);

  const [value, setValue] = useState(
    props.value >= min ? props.value || min : min
  );

  useEffect(() => {
    if (props?.value < min) {
      setValue(min);
    } else if (props?.value > max) {
      setValue(max);
    } else {
      setValue(props.value);
    }
  }, [max, min, props.value]);

  const handlePanResponderGrant = () => {
    moveStartValue = prevValue.current;
    moveStartRadian = getRadianByValue(
      prevValue.current,
      radianValue,
      max,
      min
    );
    startCartesian = polarToCartesian(
      moveStartRadian,
      radius,
      sliderWidth,
      thumbRadius,
      thumbBorderWidth as number
    );
    return true;
  };

  const handlePanResponderMove = (
    _e: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    if (disabled) {
      return;
    }
    let { x, y } = startCartesian;
    x += gestureState.dx;
    y += gestureState.dy;

    const radian = cartesianToPolar(
      x,
      y,
      radius,
      sliderWidth,
      thumbRadius,
      thumbBorderWidth as number
    );

    const ratio =
      (moveStartRadian - radian) / ((Math.PI - (radianValue as number)) * 2);

    const diff = max - min;

    let nValue: any;
    if (step) {
      nValue = moveStartValue + Math.round((ratio * diff) / step) * step;
    } else {
      nValue = moveStartValue + ratio * diff;
    }
    nValue = Math.max(min, Math.min(max, nValue));

    setValue((prevState: number) => {
      prevValue.current = Math.round(
        Math.abs(nValue - prevState) > diff / 4 ? prevState : nValue
      );
      return Math.round(
        Math.abs(nValue - prevState) > diff / 4 ? prevState : nValue
      );
    });

    onChange(prevValue.current);
  };

  const handlePanResponderEnd = () => {
    if (disabled) {
      return;
    }
    onComplete(value);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderGrant: handlePanResponderGrant,
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: handlePanResponderEnd,
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: handlePanResponderEnd,
    })
  ).current;

  const currentRadian = getCurrentRadian(value, radianValue, max, min);

  const curPoint = polarToCartesian(
    currentRadian,
    radius,
    sliderWidth,
    thumbRadius,
    thumbBorderWidth as number
  );

  return {
    panResponder,
    prevValue,
    value,
    setValue,
    curPoint,
    currentRadian,
  };
};

export default useSilderAnimation;
