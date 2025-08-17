import {Pie, PieChart, Cell, Tooltip, ResponsiveContainer, Legend} from 'recharts'
import CustomLegend from './CustomLegend'
import CustomToolTip from './CustomToolTip'

const CustomPieChart = ({data, colors}) => {
  return (
    
    <ResponsiveContainer width='100%' height={325}>
        <PieChart>
            <Pie data={data} dataKey='count' nameKey='status' cx='50%' cy='50%' outerRadius='100%' innerRadius='80%' labelLine={false}>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>
            {/* <Tooltip /> */}
            {/* <Legend /> */}
            <Tooltip content={<CustomToolTip />}/>
            <Legend content={<CustomLegend />}/>
        </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart