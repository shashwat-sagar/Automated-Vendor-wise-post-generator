import React, { useEffect, useState } from "react";
import "./style.css";
import {
  bg,
  lsiLogo,
  lsiqr,
  logoHeader,
  uploadimage,
} from "../assets/images/image";
import data2 from "../assets/data/data2";
import * as htmlToImage from "html-to-image";
import { QRCode } from "react-qrcode-logo";
const Post = () => {
  var url = "https://localshopindia.com/IN/";

  useEffect(() => {
    console.warn("Created By Shashwat Sagar");
    console.info("https://shashwatsagar.tech");
    console.info("Please do not use this application for commercial purpose");
  }, []);
  const [data, setData] = useState(data2);
  const [jsonData, setJsonData] = useState(null);
  const [layout, setLayout] = useState("layout1");
  // const [text, setText] = useState(null);

  // const paste = async () => {
  //   const text1 = await navigator.clipboard.readText(text);
  //   setText(text1);
  //   console.log(text);
  // };

  // const handleOnChange = (e) => {
  //   setText(e.target.value);
  //   setJsonData(e.target.value);
  //   console.log(jsonData);
  // };

  const changeLayout = () => {
    if (layout === "layout1") {
      setLayout("layout2");
    } else {
      setLayout("layout1");
    }
  };

  const uploadJson = () => {
    try {
      setData(JSON.parse(jsonData));
      console.log(data.length);
    } catch (err) {
      console.log("please upload a valid json file");
    }
  };

  const toImageDownload = () => {
    console.log("please wait generating images");
    setGeneratingImages("please wait Generating images...");
    toImage();
  };
  const [generatingImages, setGeneratingImages] = useState("");

  const [images, setImages] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [imageUrl, setImageUrl] = useState("");
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImageUrl(URL.createObjectURL(img));
      setImages(URL.createObjectURL(img));
    } else {
      console.log("no image selected");
      console.error("there is a problem uploading image");
    }
  };
  const selectDefaultImage = () => {
    setImages(bg);
  };

  const toImage = () => {
    console.time("time");
    data.forEach((item) => {
      let node = document.getElementById(item.name);
      htmlToImage
        .toJpeg(node, { quality: 1 })
        .then(function (dataUrl) {
          const link = document.createElement("a");
          link.download = item.name + ".jpeg";
          link.href = dataUrl;
          link.click();
          console.log("downloaded");

          console.count("count");
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
      console.countReset("count");
      console.timeEnd("time");
    });
  };

  return (
    <>
      <span className="totalShops">
        {data ? "Total Shops: " + data.length : "Total Shops: 0"}
      </span>
      <div
        className="main"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div className="download">
          {data.length > 4 ? (
            <span>Json Is Uploaded</span>
          ) : (
            <span>Please Upload Json Data</span>
          )}
          <div className="textAreaDiv">
            {/* <button className="copy" onClick={paste}>
              <i className="fa fa-copy"></i>
            </button> */}
            <textarea
              className="textArea"
              id="exampleFormControlTextarea1"
              placeholder="Paste your json data here"
              onChange={(e) => setJsonData(e.target.value)}
            ></textarea>
          </div>
          <button className="defaultImageBtn" onClick={uploadJson}>
            Upload Json
          </button>

          <div className="upload-btn-wrapper">
            <button className="btn-u">Upload an Image</button>
            <input
              type="file"
              name="myfile"
              multiple
              accept="image/*"
              onChange={onImageChange}
            />
          </div>

          <img
            style={{
              width: "200px",
              height: "200px",
            }}
            src={images ? images : uploadimage}
            alt="sample"
          />
          <i
            style={{
              marginBottom: "15px",
            }}
          >
            Preview the image
          </i>
          <div className="defaultimageDiv">
            If you don't have an image, don't worry click below to select
            default image
            <button
              className="defaultImageBtn"
              disabled={data ? false : true}
              onClick={selectDefaultImage}
            >
              Defalut Image
            </button>
          </div>
          <div>
            <button className="defaultImageBtn" onClick={changeLayout}>
              Change layout
            </button>
          </div>
          <button
            disabled={!images ? true : false}
            className="btn"
            onClick={toImageDownload}
          >
            Download All posts
          </button>
          <br />
          <i className="warning">{generatingImages}</i>
        </div>
        {images.length > 0 ? (
          <>
            {data.map((item) => {
              let urlShopName = item.name;
              // replace all spaces with -
              urlShopName = urlShopName.replace(/\s+/g, "-");
              // remove https:// from url
              let shopImgUrl = item.imgSrc.replace(
                "https://localshopindia-resource-2023-1.s3.ap-south-1.amazonaws.com/",
                ""
              );

              return (
                <div
                  style={{
                    width: "80%",
                    height: "100%",
                  }}
                  className="post"
                  id={item.name}
                  key={item.id}
                >
                  <div className="festival">
                    <img src={images} alt="" />
                  </div>
                  <div className="wish">
                    warm wishes from {item.name} in association with local shop
                    india
                  </div>
                  {layout === "layout1" ? (
                    <div
                      className="info"
                      style={{
                        width: "100%",
                        height: " 600px",
                      }}
                    >
                      <div className="shop">
                        <div className="shop-details">
                          <div className="shop-image">
                            <img src={shopImgUrl} alt="" />
                          </div>
                          <div className="shop-qr">
                            <QRCode
                              value={
                                url +
                                item.zipCodeDetail.state.code +
                                "/" +
                                item.zipCodeDetail.district +
                                "/" +
                                urlShopName
                              }
                              size="230"
                              qrStyle="dots"
                              eyeRadius={5}
                              removeQrCodeBehindLogo={true}
                              eyeColor="#ff6f00"
                              ecLevel="H"
                              logoPaddingStyle="circle"
                              logoImage={logoHeader}
                              logoWidth={20}
                              logoHeight={20}
                              logoPadding={1}
                              fgColor="#ff3f00"
                            />
                            Scan to view my products
                          </div>
                        </div>
                        <div className="shop-contact">
                          <div className="shop-contact-details">
                            <div className="shop-address">
                              <i className="fa-solid fa-shop icon"></i>
                              <div>
                                {item.address1}, {item.zipCodeDetail.district},{" "}
                                {item.zipCodeDetail.state.code},{" "}
                                {item.zipCodeDetail.country.code} -{" "}
                                {item.zipCodeDetail.zipCode}
                              </div>
                            </div>

                            <div>
                              <i className="fa-solid fa-phone icon"></i>
                              {item.phone}
                            </div>

                            <div className="shop-address">
                              <i className="fa-solid fa-globe icon"></i>
                              <div>
                                {url}
                                {item.zipCodeDetail.state.code}/
                                {item.zipCodeDetail.district}/{urlShopName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="lsi">
                        <div className="lsi-logo">
                          <img src={lsiLogo} alt="" />
                        </div>
                        <div className="lsi-contact">
                          <div className="lsi-contact-details">
                            <div>
                              <i className="fa-solid fa-phone icon"></i>
                              05362-356013
                            </div>

                            <div>
                              <i className="fa-solid fa-envelope icon"></i>
                              care@localshopindia.com
                            </div>

                            <div>
                              <i className="fa-solid fa-globe icon"></i>
                              www.localshopindia.com
                            </div>
                          </div>
                          <div className="lsi-qr">
                            <img src={lsiqr} alt="" />
                            <div>Scan to Start Shopping</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="info2">
                      <div className="shop2">
                        <div className="shopUpper">
                          <div className="shop-image2">
                            <img src={shopImgUrl} alt="" />
                          </div>
                          <span className="shop-address-2">
                            {item.address1}, {item.zipCodeDetail.district},{" "}
                            {item.zipCodeDetail.state.code},{" "}
                            {item.zipCodeDetail.country.code} -{" "}
                            {item.zipCodeDetail.zipCode}
                          </span>
                        </div>
                        <div className="shopLower">
                          <div className="shop-contact2">
                            <div className="shopQr2">
                              <QRCode
                                value={
                                  url +
                                  item.zipCodeDetail.state.code +
                                  "/" +
                                  item.zipCodeDetail.district +
                                  "/" +
                                  urlShopName
                                }
                                size="110"
                                className="qr2"
                                qrStyle="dots"
                                eyeRadius={5}
                                removeQrCodeBehindLogo={true}
                                eyeColor="#ff6f00"
                                ecLevel="H"
                                logoPaddingStyle="circle"
                                logoImage={logoHeader}
                                logoWidth={20}
                                logoHeight={20}
                                logoPadding={1}
                                fgColor="#ff3f00"
                              />
                              <p>Scan To View My Products</p>
                            </div>
                            <div className="shopPhone2">
                              <i className="fa-solid fa-phone"></i>
                              {item.phone}
                            </div>
                          </div>
                          <div className="shopUrl2">
                            <i className="fa-solid fa-globe icon2-globe"></i>
                            {url}
                            {item.zipCodeDetail.state.code}/
                            {item.zipCodeDetail.district}/{urlShopName}
                          </div>
                        </div>
                      </div>
                      <div className="lsi2">
                        <div className="shopUpper">
                          <div className="lsi-image2">
                            <img src={lsiLogo} alt="" />
                          </div>
                        </div>
                        <div className="shopLower">
                          <div className="shop-contact2">
                            <div className="shopQr2">
                              <img src={lsiqr} alt="" />
                              <p>Scan To View My Products</p>
                            </div>
                            <div className="shopPhone2">
                              <i className="fa-solid fa-phone"></i>
                              05362-356013
                            </div>
                          </div>
                          <div className="shopUrl2">
                            <i className="fa-solid fa-globe icon2-globe"></i>
                            {url}
                            {item.zipCodeDetail.state.code}/
                            {item.zipCodeDetail.district}/{urlShopName}
                          </div>
                          <div className="lsiEmail2">
                            <i className="fa-solid fa-envelope icon2-mail"></i>
                            care@localshopindia.com
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <i className="warning">Please upload an Image to generate posts</i>
        )}
      </div>
    </>
  );
};

export default Post;
