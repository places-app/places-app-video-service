module.exports = (app) => {
  app.post('/api/videos', (req, res) => {
    console.log('reqBODY', req.body);
    const videoUrl = req.body.videoUrl;
    const userPlaceId = req.body.userPlaceId;
    const job = [userPlaceId, videoUrl];
    // send message to download worker
    process.send({ download: job });
    res.sendStatus(200).end();
  });
};
