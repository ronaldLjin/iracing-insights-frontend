import Plot from 'react-plotly.js';
import { useState, useEffect } from 'react'
import theme from './theme'

export default function GraphMaker() {

    const [roadIrating, setRoadIrating] = useState([])
    const [roadWins, setRoadWins] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        Promise.all([
            fetch(`/members?category=Road&column=IRATING`).then(value => value.json()),
            fetch(`/members?category=Road&column=WINS`).then(value => value.json()),
          ]).then(allResponses => {
            setRoadIrating(allResponses[0])
            setRoadWins(allResponses[1])
            setLoading(false)
          })
    }, [])

    return (
        <Plot
            data={[
                {
                    x: roadIrating,
                    y: roadWins,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'red' },
                }
            ]}
            layout={{
                title: `test`,
                bargap: 0.5,
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                font: {
                    color: 'white',
                    family: theme.fonts.body
                }
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
        />
    )
}