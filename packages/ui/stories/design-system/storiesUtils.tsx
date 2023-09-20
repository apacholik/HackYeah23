import { Typeset } from "@storybook/addon-docs/blocks";
import { remToPx } from "polished";
import { Dispatch, Fragment, SetStateAction, useState } from "react";

type ThemeEntry = { [key: string]: { token: string; value: string | number } };

type TextStyleDescWithSelectorProps = {
  themeEntry: ThemeEntry;
  selectedItemIdx: number;
  setSelectedItemIdx: Dispatch<SetStateAction<number>>;
};

function upperFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function TextStyleDescWithSelector({
  themeEntry,
  selectedItemIdx,
  setSelectedItemIdx,
}: TextStyleDescWithSelectorProps) {
  const themeValuesList = Object.values(themeEntry);

  return (
    <>
      {themeValuesList.map(({ token, value }, idx, list) => {
        const isCurrentlySelected = idx === selectedItemIdx;
        const isLast = idx + 1 === list.length;
        const styles = {
          cursor: isCurrentlySelected ? "default" : "pointer",
          textDecoration: isCurrentlySelected ? "underline" : "none",
        };

        return (
          <span key={token}>
            <span style={styles} onClick={() => setSelectedItemIdx(idx)}>
              {upperFirstLetter(token)}
            </span>{" "}
            <em>({value})</em>
            {!isLast && <>, </>}
          </span>
        );
      })}
    </>
  );
}

export function RenderTypesetsList({
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
}: {
  fonts: ThemeEntry;
  fontSizes: ThemeEntry;
  fontWeights: ThemeEntry;
  lineHeights: ThemeEntry;
}) {
  const [currentFontWeightIdx, setCurrentFontWeightIdx] = useState(0);
  const [currentLineHeightIdx, setCurrentLineHeightIdx] = useState(0);

  const previewStyles = {
    lineHeight: Object.values(lineHeights)[currentLineHeightIdx].value,
    fontWeight: Object.values(fontWeights)[currentFontWeightIdx].value,
  };

  return Object.values(fonts).map(({ token, value }) => (
    <Fragment key={token}>
      <h2>
        {upperFirstLetter(token)} <em>(&quot;{value}&quot;)</em>
      </h2>

      <br />

      <p>
        Font weights:{" "}
        <TextStyleDescWithSelector
          themeEntry={fontWeights}
          selectedItemIdx={currentFontWeightIdx}
          setSelectedItemIdx={setCurrentFontWeightIdx}
        />
      </p>

      <br />

      <p>
        Line heights:{" "}
        <TextStyleDescWithSelector
          themeEntry={lineHeights}
          selectedItemIdx={currentLineHeightIdx}
          setSelectedItemIdx={setCurrentLineHeightIdx}
        />
      </p>

      <Typeset
        sampleText={
          (
            <span style={previewStyles}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>
          ) as unknown as string
        }
        fontFamily={value as string}
        fontSizes={Object.values(fontSizes).map(({ value }) => remToPx(value))}
      />
    </Fragment>
  ));
}
