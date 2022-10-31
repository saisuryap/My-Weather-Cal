// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: black; icon-glyph: hourglass-half;
const width=120
const h=5
const w = new ListWidget()
w.backgroundColor=new Color("#0066ff")

const now = new Date()
const weekday = now.getDay() == 0 ? 6 : now.getDay() - 1
const minutes=now.getMinutes() 
if(Device.locale() == "zh_CN"){
getwidget(24*60, (now.getHours() + 1)*60+minutes, "今日")
getwidget(7, weekday + 1, "本周")
getwidget(30, now.getDate() + 1, "本月")
getwidget(12, now.getMonth() + 1, "今年")
}else{

getwidget(24*60, (now.getHours() + 1)*60+minutes, "Today")
getwidget(7, weekday + 1, "This week")
getwidget(30, now.getDate() + 1, "This month")
getwidget(12, now.getMonth() + 1, "This year")
}
Script.setWidget(w)
Script.complete()
w.presentMedium()

async function getwidget(total, haveGone, str) {
  const titlew = w.addText(str)
  titlew.textColor = new Color("#99c2ff")
  titlew.font = Font.systemFont(12)
  w.addSpacer(4)
  //const imgw = w.addImage(creatProgress(total,haveGone))
  let photos = await Photos.latestPhotos(15);
  let index = Math.round(Math.random() * photos.length) - 1;
  let photo = photos[index];
  w.addImage(photo)
  const imgw = w.addImage()
  imgw.imageSize=new Size(width, h)
  w.addSpacer(6)
}

async function setWidgetBackground() {
  const background = this.fm.fileExists(this.bgPath) ? JSON.parse(this.fm.readString(this.bgPath)) : {}
  background.type = "image"
  const directoryPath = this.fm.joinPath(this.fm.documentsDirectory(), "My Weather Cal")
  if (!this.fm.fileExists(directoryPath) || !this.fm.isDirectory(directoryPath)) { this.fm.createDirectory(directoryPath) }
  return this.fm.writeImage(this.fm.joinPath(directoryPath, this.name + ".jpg"), await Photos.fromLibrary())
}
//let photos = await Photos.latestPhotos(15);
let index = Math.round(Math.random() * photos.length) - 1;
let photo = photos[index];
let w = new ListWidget()
w.addImage(photo)
w.presentSmall()

function creatProgress(total,havegone){
const context =new DrawContext()
context.size=new Size(width, h)
context.opaque=false
context.respectScreenScale=true
context.setFillColor(new Color("#99c2ff"))
const path = new Path()
path.addRoundedRect(new Rect(0, 0, width, h), 3, 2)
context.addPath(path)
context.fillPath()
context.setFillColor(new Color("#5b8eff"))
const path1 = new Path()
path1.addRoundedRect(new Rect(0, 0, width*havegone/total, h), 3, 2)
context.addPath(path1)
context.fillPath()
return context.getImage()
}

