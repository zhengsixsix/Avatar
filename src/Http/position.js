import axios from "axios"
function http({ url }) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        resolve(res.data)
        console.log("请求到了" + url)
      })
      .catch((err) => {
        reject(err.data)
        console.log("没请求到" + url)
      })
  })
}
const getNowPosition = () => {
  return http({
    url: "/api/location/v1/ip?&key=44UBZ-VDNC2-4DDUZ-CRKAM-IY5IT-7HBTO",
  })
}
const getWeather = (lng, lat) => {
  return http({
    url: `/weather/now?location=${lng},${lat}&key=a29b5bce6bf641d6bb028e81c0213727`,
  })
}
export { getNowPosition, getWeather }
