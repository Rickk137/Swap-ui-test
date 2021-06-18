import { useState, useCallback, useMemo, useEffect } from "react";
import Card from "./Card";
import Balance from "./Balance";
import AmountInput from "./AmountInput";
import AssetSelect from "./AssetSelect";
import cn from "classnames";
import { getTokensInfo } from "../services/tokenService";
import { assets } from "../config";
import swapIcon from "../assets/arrows.png";
import SwapConfirm from "./SwapConfirm";

function SwapForm() {
  const [confirmDialog, setConfirmDialog] = useState(false);

  const [sourceAsset, setSourceAsset] = useState(assets[0].symbol);
  const [sourceAmount, setSourceAmount] = useState();
  const [targetAsset, setTargetAsset] = useState(assets[1].symbol);
  const [tokenInfo, setTokenInfo] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getTokensInfo();
        setTokenInfo(data);
      } catch (error) {}
    };
    getData();
  }, []);

  const handleSourceAmount = useCallback((amount) => {
    const value = parseFloat(amount);

    setSourceAmount(value);
  }, []);

  const targetAmount = useMemo(() => {
    let targetValue = "";
    if (!tokenInfo) return "";
    const source = tokenInfo.find((token) => token.currency === sourceAsset);
    const target = tokenInfo.find((token) => token.currency === targetAsset);
    const result =
      parseFloat(sourceAmount * parseFloat(source.price)) /
      parseFloat(target.price);
    if (!isNaN(result)) {
      const formattedResult = `${result.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}`;
      targetValue = formattedResult.slice(1, formattedResult.length);
    }
    return targetValue;
  }, [sourceAmount, sourceAsset, targetAsset, tokenInfo]);

  const handleTargetAsset = useCallback(
    (target) => {
      if (target === sourceAsset) setSourceAsset("");
      setTargetAsset(target);
    },
    [sourceAsset]
  );

  const handleSourceAsset = useCallback(
    (source) => {
      if (source === targetAsset) {
        setTargetAsset(
          assets.filter((item) => item.symbol !== source)[0].symbol
        );
      }
      setSourceAsset(source);
    },
    [targetAsset]
  );

  const swapAssets = () => {
    const source = sourceAsset;
    setSourceAsset(targetAsset);
    setTargetAsset(source);
  };

  const hasEnoughBalance = useMemo(() => {
    const assetData = assets.find((item) => item.symbol === sourceAsset);
    return sourceAmount <= assetData.balance;
  }, [sourceAmount, sourceAsset]);

  const isValid = useMemo(() => {
    return sourceAsset && targetAsset && hasEnoughBalance;
  }, [hasEnoughBalance, sourceAsset, targetAsset]);

  return (
    <Card>
      <div className='flex flex-col items-center gap-5'>
        <AmountInput
          asset={
            <AssetSelect
              options={assets.map((item) => ({
                text: item.symbol,
                value: item.symbol,
              }))}
              value={sourceAsset}
              onChange={handleSourceAsset}
            />
          }
          label='From:'
          type='number'
          min='0'
          value={sourceAmount}
          onChange={handleSourceAmount}
          suffix={<Balance asset={sourceAsset} />}
        />
        <img
          onClick={swapAssets}
          src={swapIcon}
          alt='swap'
          className='h-10 cursor-pointer'
        />
        <AmountInput
          asset={
            <AssetSelect
              options={assets
                .filter((item) => item.symbol !== sourceAsset)
                .map((item) => ({
                  text: item.symbol,
                  value: item.symbol,
                }))}
              value={targetAsset}
              onChange={handleTargetAsset}
            />
          }
          label='To:'
          disabled
          value={targetAmount}
          onChange={() => {}}
        />
        <button
          disabled={!isValid}
          className={cn(
            "focus:outline-none mx-auto p-3 rounded-lg bg-purple-600 outline-none text-white shadow w-32 justify-center focus:bg-purple-700 hover:bg-purple-500",
            { "opacity-50": !isValid }
          )}
          onClick={() => setConfirmDialog(true)}
        >
          Swap
        </button>
      </div>
      <SwapConfirm
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        sourceAsset={sourceAsset}
        sourceAmount={sourceAmount}
        targetAsset={targetAsset}
        targetAmount={targetAmount}
      />
    </Card>
  );
}

export default SwapForm;
