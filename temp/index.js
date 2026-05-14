const axios = require("axios");
      if (src) {
        images.push(src);
      }
    });

    if (!images.length) {
      console.log("No Images Found");
      continue;
    }

    console.log(`Found ${images.length} images`);

    for (let i = 0; i < images.length; i++) {

      const imageUrl = images[i];

      const uniqueId = `${postId}-${i}`;

      if (postedPins.includes(uniqueId)) {
        console.log("Already Posted:", uniqueId);
        continue;
      }

      try {

        const originalImage = path.join(TEMP_DIR, `original-${uniqueId}.jpg`);
        const finalImage = path.join(TEMP_DIR, `final-${uniqueId}.jpg`);

        console.log("Downloading Image...");

        await downloadImage(imageUrl, originalImage);

        console.log("Adding Watermark...");

        await addWatermark(originalImage, finalImage);

        const aiTitle = generateTitle(postTitle, i);
        const aiDescription = generateDescription(aiTitle);

        console.log("Creating Pinterest Pin...");

        await createPinterestPin(
          aiTitle,
          aiDescription,
          imageUrl,
          postLink
        );

        console.log("Pin Created Successfully:", aiTitle);

        postedPins.push(uniqueId);

        await savePostedPins(postedPins);

      } catch (err) {

        console.log("Pinterest Error:");
        console.log(err.response?.data || err.message);
      }
    }
  }
}

processPosts();