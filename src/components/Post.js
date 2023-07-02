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
    data.forEach((item) => {
      console.time("time");
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
            <span>Upload Json</span>
          )}
          <textarea
            className="textArea"
            placeholder="Enter your message here"
            onChange={(e) => setJsonData(e.target.value)}
          ></textarea>
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
                            size="200"
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
