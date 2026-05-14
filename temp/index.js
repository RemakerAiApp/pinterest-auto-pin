const axios = require("axios");

      const src = $(el).attr("src");

      if (src) {
        images.push(src);
      }
    });

    for (let i = 0; i < images.length; i++) {

      const imageUrl = images[i];

      const uniqueId = `${postId}-${i}`;

      if (postedPins.includes(uniqueId)) {
        console.log("Already Posted:", uniqueId);
        continue;
      }

      try {

        const originalPath = path.join(TEMP_DIR, `original-${uniqueId}.jpg`);
        const finalPath = path.join(TEMP_DIR, `final-${uniqueId}.jpg`);

        console.log("Downloading Image...");

        await downloadImage(imageUrl, originalPath);

        console.log("Adding Watermark...");

        await addWatermark(originalPath, finalPath);

        const aiTitle = generateTitle(postTitle, i);

        const aiDescription = generateDescription(aiTitle);

        console.log("Uploading Pinterest Pin...");

        await createPin(
          page,
          finalPath,
          aiTitle,
          aiDescription,
          postLink
        );

        console.log("Pin Uploaded:", aiTitle);

        postedPins.push(uniqueId);

        await savePostedPins(postedPins);

      } catch (err) {

        console.log("Error:");
        console.log(err.message);
      }
    }
  }

  await browser.close();
}

processPosts();
