"use client";

import { Errors, Image } from "./TextbookInput";
import { styles } from "@/lib/styles";
import { Button } from "../ui/button";
import { BsTrash3Fill } from "react-icons/bs";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";
import { InputField } from "../index";

const { inputLabel, buttonOpacity, inputHover } = styles;

type TextbookTableInputProps = {
  index: number;
  setErrors: Dispatch<SetStateAction<Errors>>;
  removeContent: (index: number) => void;
  onUpdateImage: (index: number, image: Image) => void;
};

type ImageErrors = {
  imageSrc: boolean;
};

const TextbookImageInput: React.FC<TextbookTableInputProps> = ({
  index,
  setErrors,
  removeContent,
  onUpdateImage,
}) => {
  const [imageError, setImageError] = useState<ImageErrors>({
    imageSrc: false,
  });
  const [image, setImage] = useState<Image>({
    imageSrc: "",
    imageCaption: "",
  });

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      imageSrc: false,
    };

    if (!image.imageSrc.trim()) {
      newErrors = {
        imageSrc: true,
      };
      valid = false;
    }

    setImageError(newErrors);

    return valid;
  };

  const debouncedUpdateImage = useCallback(
    (updatedImage: Image) => {
      const isValid = validateForm();

      if (isValid) {
        onUpdateImage(index, updatedImage);
        setErrors((prev) => ({ ...prev, content: false }));
      } else {
        setErrors((prev) => ({ ...prev, content: true }));
      }
    },
    [validateForm],
  );

  const handleItemChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setImage((prev) => ({ ...prev, [name]: value }));
      setTimeout(() => debouncedUpdateImage({ ...image, [name]: value }), 500);
    },
    [image, setImage, debouncedUpdateImage],
  );

  return (
    <div className={`relative ${inputHover} group/table p-1`}>
      <p className={inputLabel}>&quot;image&quot;:</p>
      <div className="flex flex-col space-y-2 pl-10">
        <InputField
          label='"src"'
          name="imageSrc"
          value={image.imageSrc}
          placeHolder="https://res.cloudinary.com/dxcpen44g/image/upload/f_auto,q_auto/v1/learning-platform/html_css/l9zgjctgixkq2sfxwzgf"
          onChange={handleItemChange}
          onBlur={handleItemChange}
          error={imageError?.imageSrc}
        />
        <InputField
          label='"caption"'
          name="imageCaption"
          placeHolder="Розділяти за допомогою ( ; )"
          value={image.imageCaption}
          onChange={handleItemChange}
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className={`${buttonOpacity} group-hover/table:opacity-100 top-0 right-0`}
        onClick={() => removeContent(index)}>
        <BsTrash3Fill className="text-red-500" />
      </Button>
    </div>
  );
};

export default TextbookImageInput;
