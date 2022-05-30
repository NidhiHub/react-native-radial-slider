import { Colors } from '../../theme';

export const defaultSpeedoMeterProps = {
  radius: 100,
  min: 0,
  max: 100,
  step: 1,
  statusTitle: '',
  value: 0,
  title: '',
  subTitle: 'Speedometer',
  unit: 'MB/S',
  thumbRadius: 18,
  thumbColor: Colors.blue,
  thumbBorderWidth: 5,
  thumbBorderColor: Colors.white,
  markerLineSize: 50,
  sliderWidth: 18,
  sliderTrackColor: Colors.grey,
  lineColor: Colors.grey,
  lineSpace: 3,
  linearGradient: [
    { stop: '0%', color: Colors.skyBlue },
    { stop: '100%', color: Colors.darkBlue },
  ],
  onChange: (_v: number) => null as any,
  onComplete: (_v: number) => null as any,
  style: {},
  statusContainerStyle: {},
  statusTitleStyle: {},
  statusValueStyle: {},
  centerContentStyle: {},
  contentStyle: {},
  titleStyle: {},
  subTitleStyle: {},
  valueStyle: {},
  unitStyle: {},
  buttonContainerStyle: {},
  letIconStyle: {},
  rightIconStyle: {},
  openingRadian: Math.PI / 3,
  dynamicMarker: false,
  disabled: false,
  isHideSlider: false,
  isHideStatus: false,
  isHideTitle: false,
  isHideSubtitle: false,
  isHideValue: false,
  isHideTailText: false,
  isHideButtons: false,
  isHideLines: false,
  isHideMarkerLine: false,
  isHideCenterContent: false,
  fixedMarker: false,
  hideStyle: {},
  markerCircleSize: 15,
  markerCircleColor: Colors.grey,
  markerPositionY: 20,
  markerPositionX: 20,
  needleBackgroundColor: 'purple',
  needleColor: 'url(#gradient)',
  needleBorderWidth: '1.5',
  needleHeight: 30,
  variant: 'default',
  markerValueInterval: 10,
  markerValueColor: Colors.darkCharcoal,
};
