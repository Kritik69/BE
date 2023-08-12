import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/ProductActions";
import { Button, colors } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DiscountIcon from "@material-ui/icons/LocalOffer";
import { NEW_PRODUCT_RESET } from "../../constans/ProductConstans";
import { ToastContainer, toast } from 'react-toastify';

const CreateProduct = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.createProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [durability, setDurability] = useState("");
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const [weight, setWeight] = useState(0);
  const [material, setMaterial] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [tensile, setTensile] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Home Decor",
    "Sculpture",
    "Paintings",
    "Others"
  ]
  const materials = [
    {type: "Iron", value: 7800, tensile: 540},
    {type: "Steel", value: 7850, tensile: 550},
    {type: "Polyimide + Glass Fiber", value: 1220, tensile: 110},
    {type: "Polyimide", value: 1140, tensile: 90},
    {type: "Polyethylene Terephthalate", value: 1370, tensile: 50},
    {type: "Fiber +Glass ", value: 900+2000, tensile: 60+120},
    {type: "Steel +Glass ", value: 7850+2000, tensile: 400+120},
    {type: " Oak wood", value: 670, tensile: 100},
    {type: "Acrylic canvas ", value: 500, tensile:30},
    {type: " wood+glass cover", value: 500+2000, tensile: 40+120},
    {type: "Aluminium +glass ", value:2700+2000 , tensile: 90+120},
    {type: " Fiber Plastic ", value: 900, tensile: 70},
    {type: " Aluminium ", value: 2700, tensile: 90},
    {type: " simple wood ", value: 500, tensile: 40},
    {type: " Hard sheets ", value: 400, tensile:20 },
    {type: " Ceramic ", value: 1500, tensile: 155},
    {type: " Padauk Wood ", value: 750, tensile: 140},
    {type: " POP", value:850 , tensile: 5},
    {type: " Bronze", value: 8300, tensile: 200},
    {type: " Jute", value: 1360, tensile:200},
    {type: " Iron ", value: 7870, tensile: 540},
    {type: " Fiber clay ", value:1400, tensile: 5},
    {type: " Copper", value:8960 , tensile: 210},
    {type: " Mud clay", value:1600 , tensile: 2},
    {type: " graphite ", value: 2200, tensile: 88},
    {type: " Cotton ", value:200 , tensile: 300},
    {type: " Steel+graphite", value: 7850+2200, tensile: 400+88},
    {type: " stoneware ", value: 2300, tensile: 40},
    {type: " Limestone ", value:2700, tensile: 25},
    {type: " bone china ", value: 2400, tensile: 40},
    {type: "Steel ", value:7850, tensile: 440},
  ]

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      history.push("/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("offerPrice", offerPrice);
    myForm.set("description", description);
    myForm.set("material", material);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("durability", durability);
    myForm.set("height", height);
    myForm.set("width", width);
    myForm.set("length", length);
    myForm.set("weight", weight);
    myForm.set("tensile", tensile);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const calDurability = () => {
    // console.log(materials.map((e) => e.type))
    let info = materials.filter((val, index) => {
      return (val.type === material)
    })
    let duraMat = info[0].value*((height*width*length)/weight)*info[0].tensile/2000
    // psi to kg/m^2 = 703.07
    // Durability = (Material Strength × Volume) / (Height × Weight × Width)
    console.log(duraMat)
    setDurability(duraMat)
    if (duraMat > 9) {
      setDurability("Excellent")
    } if(duraMat > 8){
      setDurability("Great")
    } if(duraMat > 7){
      setDurability("Good")
    } if(duraMat > 6){
      setDurability("Average")
    } else {
      setDurability("Poor")
    }
    setTensile(info[0].tensile)
    // console.log(durability)
    // console.log(material)

  }

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div>
              <DiscountIcon />
              <input
                type="String"
                placeholder="Discount Percent *optional"
                onChange={(e) => setOfferPrice(e.target.value)}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Product Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <AccountTreeIcon />
              <input
                type="number"
                placeholder="Product height in cm"
                required
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div>
              <AccountTreeIcon />
              <input
                type="number"
                placeholder="Product width in cm"
                required
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
            <div>
              <AccountTreeIcon />
              <input
                type="number"
                placeholder="Product Length in cm"
                required
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div>
              <AccountTreeIcon />
              <input
                type="number"
                placeholder="Product Weight in kg"
                required
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
                </select>
            </div>
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setMaterial(e.target.value)}>
                <option value="">Choose Material</option>
                {materials.map((mat) => (
                  <option key={mat} value={mat.type}>
                    {mat.type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
            <Button onClick={calDurability}>
              Calculate Strength
            </Button>
              <p>Strength: {durability}</p>
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </Fragment>
  );
};

export default CreateProduct;