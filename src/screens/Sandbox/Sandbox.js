import React from "react";
import BaseInput from "../../components/Input/BaseInput/BaseInput";

const initData = {
    baseInput: 'Nista'
}

export default function Sandbox(){
    const [data, setData] = React.useState(initData);

    return <div>
        kita
        <BaseInput type="text" value={data.baseInput} setValue={(value)=>setData({...data, baseInput: value})}/>
    </div>
}