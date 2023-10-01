import { useState } from "react";

type Props = {
  onChange?: (file: File) => void;
};

/** Documentation for FileInput component */
export function FileInput({ onChange }: Props) {
  const [fileItem, setFileItem] = useState<null | File>(null);

  return (
    <label className="cursor-pointer flex gap-1 items-center rounded p-2 bg-blue-200" htmlFor="file">
      <span>Dodaj zdjęcie</span> <span>{fileItem?.name && `- ${fileItem.name}`}</span>
      <input
        className="hidden"
        id="file"
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            setFileItem(file);
            onChange && onChange(file);
          }
        }}
      />
    </label>
  );
}
