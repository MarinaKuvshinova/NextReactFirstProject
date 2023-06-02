import React, { useRef, useState, useCallback, useEffect } from "react";
import styles from "@/styles/Multirange.module.css";

export default function MultiRangeSlider({ min, max, onChange }) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );
  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className={styles.range_box + " w-full"}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={
          styles.thumb +
          " " +
          styles.thumb_zindex_3 +
          " " +
          (minVal > max - 100 && styles.thumb_zindex_5)
        }
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className={styles.thumb + " " + styles.thumb_zindex_4}
      />
      <div className={styles.slider}>
        <div className={styles.slider__track} />
        <div
          ref={range}
          className={"bg-darkGrey dark:bg-lightGreen " + styles.slider__range}
        />
        <div
          className={
            "text-darkGrey dark:text-lightGrey absolute top-0 left-0 pt-2 " +
            styles.slider__left_value
          }
        >
          {minVal}
        </div>
        <div
          className={
            "text-darkGrey dark:text-lightGrey absolute top-0 right-0 pt-2 " +
            styles.slider__right_value
          }
        >
          {maxVal}
        </div>
      </div>
    </div>
  );
}
