import React, { createContext, useContext, useState } from 'react'


const HeaderBG = createContext()

export const HeaderBGProvider = ({ children }) => {
    const [color, setColor] = useState(null)

    const updateColor = rgb => {
        setColor(rgb ?? 'black')
    }


    return (
        <HeaderBG.Provider value={{
            updateColor, color
        }}>
            {children}
        </HeaderBG.Provider>
    )
}

export function useHeaderBGContext() {
    return useContext(HeaderBG)
}