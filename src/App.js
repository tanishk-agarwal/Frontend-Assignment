import "./App.css";
import { useEffect, useState } from "react";
import Input from "./components/Input";
import GroupField from "./components/GroupField";
import SelectField from "./components/SelectField";
import RadioField from "./components/RadioField";
import SwitchField from "./components/SwitchField";
import { useForm } from "react-hook-form";
import { returnSortedBySort } from "./utils/utils";
import NotJson from "./components/NotJson";
import FormSubmitted from "./components/FormSubmitted";

const App = () => {
  //hook form
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
  });
  const onsubmit = (data) => {
    console.log(data);
    setFormSubmitted(data);
  };

  const [uiSchema, setUiSchema] = useState();
  const [properJson, setProperJson] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  function handleSchemaChange(e) {
    if (isJsonString(e.target.value)) {
      if (!e.target.value) {
        //means it is empty
        setProperJson(true);
      }
      setUiSchema(JSON.parse(e.target.value));
    } else {
      setProperJson(false);
      console.log("Not proper json");
      setUiSchema(null);
    }
  }

  return (
    <>
      <div className="grid grid-cols-12">
        {formSubmitted && (
          <FormSubmitted
            data={formSubmitted}
            closeSubmittedPopup={(e) => setFormSubmitted(false)}
          />
        )}
        <div className="col-span-6 border-r border-gray-400">
          <textarea
            placeholder="Paste the UI Schema here..."
            className="w-full h-screen p-8 "
            onChange={(e) => handleSchemaChange(e)}
            // value={uiSchema}
          ></textarea>
        </div>

        {uiSchema ? (
          <form
            className="col-span-6 p-8 h-screen overflow-y-auto"
            onSubmit={handleSubmit(onsubmit)}
          >
            {returnSortedBySort(uiSchema).map((item, index) => {
              {
                if (item.validate.required) {
                  if (item.uiType == "Input")
                    return (
                      <Input
                        key={index}
                        data={item}
                        namefield={item.jsonKey}
                        register={register}
                      />
                    );
                  else if (item.uiType == "Group")
                    return (
                      <GroupField
                        key={index}
                        data={item}
                        parentJsonKey={item.jsonKey}
                        register={register}
                        watch={watch}
                        getValues={getValues}
                      />
                    );
                  else if (item.uiType == "Select")
                    return (
                      <SelectField
                        key={index}
                        data={item}
                        namefield={item.jsonKey}
                        register={register}
                      />
                    );
                  else if (item.uiType == "Radio")
                    return (
                      <RadioField
                        key={index}
                        data={item}
                        namefield={item.jsonKey}
                        register={register}
                      />
                    );
                  else if (item.uiType == "Switch")
                    return (
                      <SwitchField
                        key={index}
                        data={item}
                        namefield={item.jsonKey}
                        register={register}
                      />
                    );
                }
              }
            })}

            {showAdvanced &&
              returnSortedBySort(uiSchema).map((item, index) => {
                {
                  if (item.validate && !item.validate.required) {
                    if (item.uiType == "Input")
                      return (
                        <Input
                          key={index}
                          data={item}
                          namefield={item.jsonKey}
                          register={register}
                        />
                      );
                    else if (item.uiType == "Group")
                      return (
                        <GroupField
                          key={index}
                          data={item}
                          parentJsonKey={item.jsonKey}
                          register={register}
                          watch={watch}
                          getValues={getValues}
                        />
                      );
                    else if (item.uiType == "Select")
                      return (
                        <SelectField
                          key={index}
                          data={item}
                          namefield={item.jsonKey}
                          register={register}
                        />
                      );
                    else if (item.uiType == "Radio")
                      return (
                        <RadioField
                          key={index}
                          data={item}
                          namefield={item.jsonKey}
                          register={register}
                        />
                      );
                    else if (item.uiType == "Switch")
                      return (
                        <SwitchField
                          key={index}
                          data={item}
                          namefield={item.jsonKey}
                          register={register}
                        />
                      );
                  }
                }
              })}

            {/* <div className="mt-4 mb-2 flex items-center">
              <input
                type="checkbox"
                value={showAdvanced}
                onChange={(e) => setShowAdvanced(!showAdvanced)}
              />
              <h1 className="ml-2">Show advanced options</h1>
            </div> */}
            <div className="mt-4 mb-2 flex items-center">
  <input
    id="toggleAdvanced"
    type="checkbox"
    className="hidden"
    value={showAdvanced}
    onChange={(e) => setShowAdvanced(!showAdvanced)}
  />
 <label
    htmlFor="toggleAdvanced"
    className="cursor-pointer flex items-center"
  >
    <div className={`relative w-11 h-6 bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${showAdvanced ? 'bg-purple-500' : 'bg-gray-300'}`}>
      <div className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${showAdvanced ? 'translate-x-full' : 'translate-x-0'}`}></div>
    </div>
    <h1 className="ml-2">Show advanced options</h1>
  </label>
</div>
            <button
              className="bg-gray-800 text-white font-medium rounded-md px-4 py-2 mt-4"
              type="submit"
            >
              Submit Form
            </button>
          </form>
        ) : properJson ? null : (
          <NotJson />
        )}
      </div>
      )
    </>
  );
};

export default App;
