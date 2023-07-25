/** @format */

// pages/api/screenshot.js
// import puppeteer from 'puppeteer';
const puppeteer = require("puppeteer");
const express = require("express");
const router = express.Router();
const { EventEmitter } = require("events");

const customEmitter = new EventEmitter();
customEmitter.setMaxListeners(0); // Set max

const takeScreenshot = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 832 });

  await page.goto(url);

  await page.waitForTimeout(2000);

  const screenshot = await page.screenshot({ type: "jpeg", quality: 30 });

  await browser.close();
  return screenshot;
};

router.get("/", async (req, res) => {
  console.log("get screenshot route");
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: "URL parameter is missing." });
    }

    const screenshot = await takeScreenshot(url);

    // Emit a custom event with the screenshot data
    customEmitter.emit("screenshotTaken", screenshot);

    res.setHeader("Content-Type", "image/jpeg");
    console.log("screenshot sent");
    res.end(screenshot);
  } catch (error) {
    console.error("Error taking screenshot:", error);
    res.status(500).end();
  }
});

// Custom event listener
customEmitter.on("screenshotTaken", (screenshotData) => {
  // Do something with the screenshot data
  console.log("Screenshot data received:", screenshotData);
});

module.exports = router;
