import React, { use, useEffect, useState } from "react";

export default function MultiSelect({ defaulValue, values, setValues }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {}, []);

  function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
      checkboxes.style.display = "block";
      setExpanded(true);
    } else {
      checkboxes.style.display = "none";
      setExpanded(false);
    }
  }
  console.log("values", values);

  return (
    <div className="multiselect">
      <div className="selectBox" onClick={() => showCheckboxes()}>
        <select>
          <option>{defaulValue}</option>
        </select>
        <div className="overSelect"></div>
      </div>
      <div id="checkboxes">
        {values.map((item, index) => {
          <label key={item} forHtml={item + index}>
            <input
              type="checkbox"
              value={item}
              onChange={(e) => setValues(e.target.val())}
              id={item + index}
            />
            {item} {index}
          </label>;
        })}
      </div>
    </div>
  );
}
