//      HEAD COMPONENT
import React from "react";
import { View } from "reacr-native";

export default function Head({ position, size })
{
    return (
        <View
            style=
            {{
                width: size,
                height: size,
                backgrounfColor:"red",
                position: "absolute",
                left: position[0] * size,
                top: position[1] * size
            }}
       ></View>
    )
}