import { Minus, Plus, X } from "lucide-react";
import React from "react";
type Poptype = {
  setNewEntry: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NewEntry = ({ setNewEntry }: Poptype) => {
  const [newEntryData, setNewEntryData] = React.useState({
    project: "",
    workType: "",
    description: "",
    hours: 0,
  });

  const handleOnchange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewEntryData({
      ...newEntryData,
      [name]: value,
    });
  };
  return (
    <div className="fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-linear h-screen backdrop-blur-md bg-(--foreground)/20 flex justify-center items-center">
      <div className="bg-(--base-color) flex flex-col gap-5 2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 w-[90%] p-5 rounded-lg">
        <div className="flex my-3 justify-between items-center w-full">
          <h4 className="font-semibold 2xl:text-[1.5dvw] xl:text-[1.5dvw] lg:text-[1.5dvw] md:text-[1.5dvw] text-[5dvw] ">Add New Entry</h4>
          <button
            className="cursor-pointer"
            onClick={() => {
              setNewEntry(false);
            }}
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1 w-full">
            <label className="font-medium 2xl:text-[1.1dvw] xl:text-[1.1dvw] lg:text-[1.1dvw] md:text-[1.1dvw] text-[3.5dvw] text-(--text-mainColor)">
              Select Project *
            </label>
            <select
              name="project"
              onChange={handleOnchange}
              value={newEntryData.project}
              className="p-2 border border-(--border-color) rounded-md mt-2 w-full text-(--text-secondaryColor) active:border-(--border-color) focus:border-(--border-color)"
            >
              <option value="">Select Project</option>
              <option value="Morder Women">Modern Women</option>
              <option value="Sell Sync">Sell Sync</option>
              <option value="Maven">Maven</option>
              <option value="Royal">Royal</option>
              <option value="Tab&Pay">Tab & Pay</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="font-medium 2xl:text-[1.1dvw] xl:text-[1.1dvw] lg:text-[1.1dvw] md:text-[1.1dvw] text-[3.5dvw] text-(--text-mainColor)">
              Type of Work *
            </label>
            <select
              name="workType"
              onChange={handleOnchange}
              value={newEntryData.workType}
              className="p-2 border border-(--border-color) rounded-md mt-2 w-full text-(--text-secondaryColor) active:border-(--border-color) focus:border-(--border-color)"
            >
              <option value="">Bug Fixes</option>
              <option value="API Creation and intergation">
                API Creation and intergation
              </option>
              <option value="Rework in Design">Rework in Design</option>
              <option value="Create new Sections">Create new Sections</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="font-medium 2xl:text-[1.1dvw] xl:text-[1.1dvw] lg:text-[1.1dvw] md:text-[1.1dvw] text-[3.5dvw] text-(--text-mainColor)">
              Task description *
            </label>
            <textarea
              name="description"
              onChange={handleOnchange}
              value={newEntryData.description}
              className="w-full mt-2 p-2 border border-(--border-color) rounded-md text-(--text-secondaryColor) active:border-(--border-color) focus:border-(--border-color)"
              rows={4}
              placeholder="Describe your work here..."
            ></textarea>
          </div>
          <div className="flex flex-col justify-start items-start gap-1 w-auto">
            <label className="font-medium 2xl:text-[1.1dvw] xl:text-[1.1dvw] lg:text-[1.1dvw] md:text-[1.1dvw] text-[3.5dvw] text-(--text-mainColor)">
              Hours *
            </label>
            <div className="flex justify-start items-center border border-(--border-color) rounded-md 2xl:w-auto xl:w-auto lg:w-auto md:w-auto w-full ">
              <button
                className="cursor-pointer flex-1 flex justify-center items-center p-2"
                onClick={() => {
                  setNewEntryData({
                    ...newEntryData,
                    hours: newEntryData.hours <= 0 ? 0 : newEntryData.hours - 1,
                  });
                }}
              >
                <Minus />
              </button>
              <input
                type="number"
                className="w-20 mx-2 flex-1 p-2 border-l border-r border-(--border-color)  text-(--text-secondaryColor) active:border-(--border-color) focus:border-(--border-color) text-center appearance-none aarospin-none"
                defaultValue={newEntryData.hours}
                value={newEntryData.hours}
                min={0}
              />
              <button
                className="cursor-pointer flex-1 flex justify-center items-center p-2"
                onClick={() => {
                  setNewEntryData({
                    ...newEntryData,
                    hours: newEntryData.hours + 1,
                  });
                }}
              >
                <Plus />
              </button>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-5 items-center w-full">
            <button className="bg-(--button-color) text-white px-4 py-2 rounded-md hover:opacity-90 cursor-pointer w-full transition-all duration-300">
              Add Entry
            </button>
            <button
              onClick={() => {
                setNewEntry(false);
              }}
              className="bg-transparent border border-(--border-color)  text-(--text-mainColor) px-4 py-2 rounded-md hover:bg-(--text-mainColor) hover:text-(--base-color) cursor-pointer w-full transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
