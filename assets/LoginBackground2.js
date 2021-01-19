import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, G, Rect } from "react-native-svg"
/* width="327.33456mm"
height="284.90271mm" 
viewBox="0 0 327.33457 284.90271" */
import { Dimensions } from 'react-native';
function SvgComponent(props) {
    return (
        <Svg
            width="327.33456mm"
            height="284.90271mm"
            viewBox="0 0 327.33457 284.90271"
            id="svg8"
            {...props}
        >
            <Defs id="defs2">
                <LinearGradient id="linearGradient1248"
                    x1={266.81693}
                    y1={7.0569315}
                    x2={-61.84016}
                    y2={290.31058}
                    gradientUnits="userSpaceOnUse">
                    <Stop offset={0} id="stop1244" stopColor="#ff8420" stopOpacity={1} />
                    <Stop
                        offset={1}
                        id="stop1246"
                        stopColor="#ff8420"
                        stopOpacity={0.55096188}
                    />
                </LinearGradient>
            </Defs>
            <G id="layer1" transform="translate(61.357494,-6.3746796)">
                <Rect
                    id="rect1081"
                    width={328.65707}
                    height={283.25363}
                    x={-61.84016}
                    y={7.0569315}
                    fill="url(#linearGradient1248)"
                    fillOpacity={1}
                    strokeWidth={0.266801}
                    opacity={1}
                />
            </G>
        </Svg>
    )
}

export default SvgComponent

