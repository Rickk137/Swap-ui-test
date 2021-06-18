import { useMemo } from "react";
import { assets } from "../config";

function Balance({ asset }) {
  const balance = useMemo(() => {
    const assetData = assets.find((item) => item.symbol === asset);
    if (assetData) return assetData.balance;
    return " ";
  }, [asset]);
  return <div className='text-xs'>Balance: {balance}</div>;
}

export default Balance;
