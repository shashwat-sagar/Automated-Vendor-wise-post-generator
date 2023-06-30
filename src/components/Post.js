import React, { useEffect } from "react";
import "./style.css";
import { bg, lsiLogo, lsiqr, logoHeader } from "../assets/images/image";
import data from "../assets/data/data";
import * as htmlToImage from "html-to-image";
import { QRCode } from "react-qrcode-logo";

const Post = () => {
  const newData = data;
  useEffect(() => {
    console.warn("Created By Shashwat Sagar");
    console.info("https://shashwatsagar.tech");
    console.info("Please do not use this application for commercial purpose");
  }, []);
  const toImageDownload = () => {
    console.log("please wait generating images");
    toImage();
  };
  const toImage = () => {
    newData.forEach((item) => {
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
    <div
      className="main"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <button onClick={toImageDownload}>Download</button>
      {newData.map((item) => {
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
              <img src={bg} alt="" />
            </div>
            <div className="wish">
              warm wishes from {item.name} in association with local shop india
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
                    <img src={item.img} alt="" />
                  </div>
                  <div className="shop-qr">
                    {/* <img src={shopqr} alt="" /> */}
                    <QRCode
                      value={item.url}
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
                      <div>{item.address}</div>
                    </div>

                    <div>
                      <i className="fa-solid fa-phone icon"></i>
                      {item.phone}
                    </div>

                    <div className="shop-address">
                      <i className="fa-solid fa-globe icon"></i>
                      <div>{item.url}</div>
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
    </div>
  );
};

export default Post;
