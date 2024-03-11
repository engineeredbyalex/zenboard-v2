import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

function Categories() {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    setIsLoading(true);
    axios.get('/api/categories/categories').then(result => {
      setCategories(result.data);
      setIsLoading(false);
    });
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map(p => ({
        name: p.name,
        values: p.values.split(','),
      })),
    };

    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories/categories', data);
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories/categories', data);
    }

    setName('');
    setParentCategory('');
    setProperties([]);
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(',')
      }))
    );
  }

  function deleteCategory(category) {
    const confirmDelete = window.confirm(`Do you want to delete ${category.name}?`);

    if (confirmDelete) {
      const { _id } = category;
      axios.delete('/api/categories/categories?_id=' + _id)
        .then(() => {
          fetchCategories();
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
        });
    }
  }

  function addProperty() {
    setProperties(prev => {
      return [...prev, { name: '', values: '' }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties(prev => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <div className="text-center">
        <h3 className="uppercase font-bold text-black w-full text-center">
         Categories
        </h3>
      </div>
      <label className=" uppercase grey_text mt-10 mb-10 flex items-center justify-center">
        {editedCategory
          ? `Edit category : ${editedCategory.name}`
          : 'Add a new category'}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex items-center justify-center gap-1 mt-10 mb-10 flex-col lg:flex-row">
          <input
            className="w-[20rem] light_grey_background py-3 px-3"
            type="text"
            placeholder={'Category name'}
            onChange={ev => setName(ev.target.value)}
            value={name} />
          <select
            className="w-[20rem] light_grey_background py-3 px-3"
            onChange={ev => setParentCategory(ev.target.value)}
            value={parentCategory}>
            <option className="w-[20rem] light_grey_background py-3 px-3" value="">Categorie principală</option>
            {categories.length > 0 && categories.map(category => (
              <option className="w-[20rem] light_grey_background py-3 px-3" key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-2 flex flex-col items-center justify-center">
          <label className="block uppercase grey_text"><h4>Properties</h4></label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-primary mb-2">
            <h5>
              Add a new property
            </h5>
          </button>
          {properties.length > 0 && properties.map((property, index) => (
            <div key={index} className="flex gap-1 mb-2 items-center justify-center">
              <input type="text"
                value={property.name}
                className="mb-0"
                onChange={ev => handlePropertyNameChange(index, property, ev.target.value)}
                placeholder="property name (example: color)" />
              <input type="text"
                className="mb-0"
                onChange={ev =>
                  handlePropertyValuesChange(
                    index,
                    property, ev.target.value
                  )}
                value={property.values}
                placeholder="values, comma separated" />
              <button
                onClick={() => removeProperty(index)}
                type="button"
                className="btn-red">
                <h5>
                  Delete
                </h5>
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-1 mb-2 items-center justify-center">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName('');
                setParentCategory('');
                setProperties([]);
              }}
              className="btn-primary"><h5>Cancel</h5></button>
          )}
          <button type="submit"
            className="btn-primary py-1 rounded-lg">
            <h5>
              Save
            </h5>
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category name</td>
              <td>Main category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              null
            )}
            {categories.length > 0 && categories.map(category => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td className="flex flex-col gap-5">
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-primary mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category)}
                    className="btn-red">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default Categories;
