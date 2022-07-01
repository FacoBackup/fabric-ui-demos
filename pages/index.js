import React, {useDeferredValue, useEffect, useMemo, useState} from "react";
import {DataRow, Icon, Masonry, ToolTip, useAlert} from "@f-ui/core";
import Head from "next/head";

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function debounce(callback, delay = 250) {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            callback(...args)
        }, delay)
    }
}

const DEFAULT = 10
export default function Home() {
    const [quantity, setQuantity] = useState(DEFAULT)
    const elements = useMemo(() => {
        const result = []
        for (let i = 0; i < quantity; i++) {
            result.push(
                <DataRow
                    styles={{width: "100%"}}
                    asCard={true}
                    object={{
                        img: "https://picsum.photos/200/" + randomNumber(200, 500),
                        l1: "Lorem ipsum",
                        l2: (new Date()).toDateString(),
                        l3: "Lorem ipsum"
                    }}
                    keys={[
                        {key: "img", type: "image"},
                        {key: "l1", label: "Label", type: "string", maskStart: "Mask: "},
                        {key: "l2", label: "Label 2", type: "date"}
                    ]}
                />
            )
        }
        return result
    }, [quantity])

    useAlert(true)
    const update = debounce((text) => {
        setQuantity(text)
        alert.pushAlert("Updating images", "info")
    }, 300)

    return (
        <>
            <Head>
                <title>Demo</title>
                <link rel="shortcut icon" href="/logo.png"/>
            </Head>
            <div style={{display: "flex", gap: "8px", alignItems: "center"}}>
                <div>
                    <Icon styles={{fontSize: "1.1rem"}}>
                        info
                    </Icon>
                    <ToolTip>
                        Responsive, easy to use and customizable masonry layout.
                    </ToolTip>
                </div>

                <h2>Demo Masonry component</h2>
                <a rel={"noreferrer"} href={"https://github.com/fabric-ui/core"} target={"_blank"}>
                    <Icon styles={{fontSize: "1.1rem"}}>
                        open_in_new
                    </Icon>
                </a>
            </div>
            <div style={{display: "grid", color: "var(--fabric-color-secondary)"}}>
                <div style={{fontSize: ".75rem", display: "flex", justifyContent: "space-between", height: "20px"}}>
                    <label>
                        Quantity ({quantity})
                    </label>
                    <a rel={"noreferrer"} href={"https://picsum.photos/"} style={{display: "flex", alignItems: "center", gap: "4px"}} target={"_blank"}>
                        Thanks picsum
                        <Icon styles={{color: "#ff5555",fontSize: "1.1rem"}}>
                            favorite
                        </Icon>
                    </a>
                </div>
                <input
                    type={"range"}
                    defaultValue={DEFAULT}
                    onChange={v => {

                        update(v.target.value)
                    }} min={DEFAULT} max={100}/>
            </div>
            <Masonry>
                {elements.map((e, i) => (
                    <React.Fragment key={i + "list"}>
                        {e}
                    </React.Fragment>
                ))}
            </Masonry>
        </>
    )
}
