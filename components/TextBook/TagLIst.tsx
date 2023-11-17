"use client";

import React, { useState, ChangeEvent } from "react";

interface Attributes {
  [key: string]: string;
}

interface Styles {
  [key: string]: string;
}

const tags = [
  "div",
  "span",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "a",
  "img",
  "ul",
  "ol",
  "li",
  "form",
  "input",
  "button",
];

const tagAttributesOptions = [
  "id",
  "class",
  "src",
  "alt",
  "href",
  "target",
  "width",
  "height",
  "placeholder",
  "type",
  "value",
  "for",
  "action",
  "method",
  "colspan",
  "rowspan",
  "disabled",
  "readonly",
  "checked",
  "selected",
  // Додайте інші атрибути
];

const stylePropertiesOptions = [
  "color",
  "font-size",
  "margin",
  "padding",
  "border",
  "width",
  "height",
  "background-color",
  "text-align",
  "display",
  "flex",
  "justify-content",
  "align-items",
  "flex-direction",
  "border-radius",
  "box-shadow",
  "text-decoration",
  "line-height",
  "font-weight",
  "font-family",
  "cursor",
  // Додайте інші стилі
];

const TagList: React.FC = () => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [selectTag, setSelectTag] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [attributes, setAttributes] = useState<Attributes>({});
  const [selectedAttribute, setSelectedAttribute] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [styles, setStyles] = useState<Styles>({});

  const handleAttributeChange = (attribute: string, value: string) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: value,
    }));
  };

  const handleStyleChange = (property: string, value: string) => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      [property]: value,
    }));
  };

  const handleTagClick = (tag: string) => {
    setSelectTag(true);
    setSelectedTag(tag);
    setAttributes({});
    setStyles({});
    setShowPreview(false);
  };

  const handleAttributeSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedAttribute = e.target.value;
    setSelectedAttribute(selectedAttribute);
    handleAttributeChange(selectedAttribute, attributes[selectedAttribute] || "");
  };

  const handleStyleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedStyle = e.target.value;
    setSelectedStyle(selectedStyle);
    handleStyleChange(selectedStyle, styles[selectedStyle] || "");
  };

  const handleShowPreview = () => {
    setShowPreview(true);
  };

  const renderTag = (tag: string) => {
    const tagAttributes = Object.entries(attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");
    const tagStyles = Object.entries(styles)
      .map(([property, value]) => `${property}: ${value}`)
      .join("; ");

    return `<${tag} ${tagAttributes} style="${tagStyles}">Content here</${tag}>`;
  };

  return (
    <div className="flex p-2">
      <div className="w-1/2 p-2">
        <h1 className="text-xl">HTML Tag Editor</h1>
        <ul className="flex space-x-2 flex-wrap">
          {tags.map((item, index) => {
            return (
              <li
                key={item + index}
                className={`px-2 py-1 hover:bg-accent cursor-pointer rounded-lg ${
                  item === selectedTag ? "bg-accent" : ""
                }`}
                onClick={() => handleTagClick(item)}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-1/2 p-2">
        <div className="mb-4">
          <label>Атрибути:</label>
          <select
            defaultValue="Виберіть атрибут"
            onChange={handleAttributeSelectChange}
            className="block w-full bg-white border border-gray-300 p-2 rounded">
            <option value="Виберіть атрибут" disabled selected>
              Виберіть атрибут
            </option>
            {tagAttributesOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Value"
            value={attributes[selectedAttribute] || ""}
            onChange={(e) => handleAttributeChange(selectedAttribute, e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label>Стилі:</label>
          <select
            defaultValue="Виберіть стилі"
            onChange={handleStyleSelectChange}
            className="block w-full bg-white border border-gray-300 p-2 rounded">
            <option value="Виберіть стилі" disabled selected>
              Виберіть стилі
            </option>
            {stylePropertiesOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Value"
            value={styles[selectedStyle] || ""}
            onChange={(e) => handleStyleChange(selectedStyle, e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button onClick={handleShowPreview} className="bg-blue-500 text-white p-2 rounded">
          Показати прев&apos;ю
        </button>
        {showPreview && selectTag && (
          <div className="mt-4">
            <label>Прев&apos;ю:</label>
            <div
              dangerouslySetInnerHTML={{ __html: renderTag(selectedTag!) }}
              className="p-4 border border-gray-300 rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TagList;
