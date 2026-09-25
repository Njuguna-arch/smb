import Video from "../models/Video.js";

function normalizeYoutubeUrl(url) {
  try {
    if (url.includes("youtu.be")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/watch?v=${id}`;
    }
    if (url.includes("youtube.com/watch")) {
      const id = new URLSearchParams(new URL(url).search).get("v");
      return `https://www.youtube.com/watch?v=${id}`;
    }
    return url;
  } catch {
    return url;
  }
}

export const getVideos = async (req, res) => {
  const { subject, grade, keyword, type } = req.query;
  try {
    const query = {};

    if (subject && subject !== "All") query.subject = subject;
    if (grade && grade !== "All") query.grade = grade;
    if (type && type !== "All") query.type = type;
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    const videos = await Video.find(query).sort({ createdAt: -1 });

    const normalizedVideos = videos.map((v) => ({
      ...v._doc,
      videoUrl: normalizeYoutubeUrl(v.videoUrl),
    }));

    res.status(200).json(normalizedVideos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos", error: err.message });
  }
};

export const getFeaturedVideos = async (req, res) => {
  try {
    const videos = await Video.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(5);

    const normalizedVideos = videos.map((v) => ({
      ...v._doc,
      videoUrl: normalizeYoutubeUrl(v.videoUrl),
    }));

    res.status(200).json(normalizedVideos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch featured videos", error: err.message });
  }
};

export const addVideo = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const { title, subject, grade, videoUrl, description, type, featured } = req.body;

    if (!title || !subject || !grade || !videoUrl) {
      return res.status(400).json({
        message: "Missing required fields: title, subject, grade, videoUrl",
      });
    }

    const allowedTypes = ["Educational", "Entertainment"];
    const videoType = allowedTypes.includes(type) ? type : "Educational";

    const normalizedUrl = normalizeYoutubeUrl(videoUrl);

    const video = await Video.create({
      title,
      subject,
      grade,
      description: description || "",
      videoUrl: normalizedUrl,
      type: videoType,
      featured: featured || false,
      uploadedBy: req.user?.id,
    });

    res.status(201).json(video);
  } catch (err) {
    console.error("Error adding video:", err.message);
    res.status(500).json({ message: "Failed to add video", error: err.message });
  }
};