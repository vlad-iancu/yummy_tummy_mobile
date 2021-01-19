import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"

function LoginBackground(props) {
    return (
        <Svg
            width="100%"
            height="100%"
            viewBox="0 0 327.33457 284.90271"
            {...props}
        >
            <Defs>
                <LinearGradient
                    id="b"
                    x1={266.81693}
                    y1={7.0569315}
                    x2={-61.84016}
                    y2={290.31058}
                    gradientUnits="userSpaceOnUse">
                    <Stop offset={0} stopColor="#ff8420" stopOpacity={1} />
                    <Stop offset={1} stopColor="#ff8420" stopOpacity={0} />
                </LinearGradient>
            </Defs>
            <Path
                transform="translate(61.357 -6.375)"
                d="M-61.84016 7.0569315H266.81691V290.3105615H-61.84016z"
                fill="url(#b)"
                fillOpacity={1}
                strokeWidth={0.266801}
                opacity={1}
            />
        </Svg>
    )
}

export default LoginBackground