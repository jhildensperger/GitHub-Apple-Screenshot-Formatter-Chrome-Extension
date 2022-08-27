function replaceLinks() {
  function getScreenWidthForDevice(device) {
    switch (device) {
      case "iPhone 13":
        return "390";
      case "iPhone 13 mini":
        return "375";
      case "iPhone 13 Pro Max":
        return "428";
      case "iPhone 13 Pro":
        return "390";
      case "iPhone 12":
        return "390";
      case "iPhone 12 mini":
        return "375";
      case "iPhone 12 Pro Max":
        return "428";
      case "iPhone 12 Pro":
        return "390";
      case "iPhone SE 2nd gen":
        return "375";
      case "iPhone 11 Pro Max":
        return "414";
      case "iPhone 11 Pro":
        return "375";
      case "iPhone 11":
        return "414";
      case "iPhone XR":
        return "414";
      case "iPhone XS Max":
        return "414";
      case "iPhone XS":
        return "375";
      case "iPhone X":
        return "375";
      case "iPhone 8 Plus":
        return "414";
      case "iPhone 8":
        return "375";
      case "iPhone 7 Plus":
        return "476";
      case "iPhone 7":
        return "375";
      case "iPhone SE 1st gen":
        return "320";
      case "iPhone 6s Plus":
        return "476";
      case "iPhone 6s":
        return "375";
      case "iPhone 6 Plus":
        return "476";
      case "iPhone 6":
        return "375";
      case "iPhone 5C":
        return "320";
      case "iPhone 5S":
        return "320";
      case "iPhone 5":
        return "320";
      case "iPhone 4S":
        return "320";
      case "iPhone 4":
        return "320";
      case "iPhone 3GS":
        return "320";
      case "iPhone 3G":
        return "320";
      case "iPhone 1st gen":
        return "320";
      case "iPad Mini (6th gen)":
        return "744";
      case "iPad 9th gen":
        return "810";
      case "iPad Pro (5th gen 12.9\")":
        return "1024";
      case "iPad Pro (5th gen 11\")":
        return "834";
      case "iPad Air (4th gen)":
        return "820";
      case "iPad 8th gen":
        return "810";
      case "iPad Pro (4th gen 12.9\")":
        return "1024";
      case "iPad Pro (4th gen 11\")":
        return "834";
      case "iPad 7th gen":
        return "810";
      case "iPad Mini (5th gen)":
        return "768";
      case "iPad Air (3rd gen)":
        return "834";
      case "iPad Pro (3rd gen 12.9\")":
        return "1024";
      case "iPad Pro (3rd gen 11\")":
        return "834";
      case "iPad 6th gen":
        return "768";
      case "iPad Pro (2nd gen 12.9\")":
        return "1024";
      case "iPad Pro (2nd gen 10.5\")":
        return "834";
      case "iPad 5th gen":
        return "768";
      case "iPad Pro (1st gen 9.7”)":
        return "768";
      case "iPad Pro (1st gen 12.9\")":
        return "1024";
      case "iPad mini 4":
        return "768";
      case "iPad Air 2":
        return "768";
      case "iPad mini 3":
        return "768";
      case "iPad mini 2":
        return "768";
      case "iPad Air":
        return "768";
      case "iPad 4th gen":
        return "768";
      case "iPad mini":
        return "768";
      case "iPad 3rd gen":
        return "768";
      case "iPad 2":
        return "768";
      case "iPad 1st gen":
        return "768";
      case "iPod touch 7th gen":
        return "320";
      case "iPod touch 6th gen":
        return "320";
      case "iPod touch 5th gen":
        return "320";
      case "iPod touch 4th gen":
        return "320";
      case "iPod touch 3rd gen":
        return "320";
      case "iPod touch 2nd gen":
        return "320";
      case "iPod touch 1st gen":
        return "320";
      default:
        return "375";
    }
  }

  const node = document.getElementsByName('pull_request[body]')[0];

  if (node == undefined) {
    console.log("Must be editing pull request", "document.getElementsByName('pull_request[body]')[0]")
  } else {
    console.log("node", node);
  
    var text = node.value;
    console.log("text", text);
    
    const regexpLinks = /\!\[Simulator\sScreen\sShot\s-\s(?<device>.*?)\s-.*?\((?<url>.*?)\)/g;
    
    for (const match of text.matchAll(regexpLinks)) {
      const url = match.groups.url;
      const width = getScreenWidthForDevice(match.groups.device);
      let update = `# ${match.groups.device}\n<img src=\"${url}\" width=\"${width}\">\n`;
      console.log("update", update);
      text = text.replace(match[0], update);
      console.log("match[0]", match[0]);
      console.log("updated text", text);
    }
    
    console.log("final text", text);
    node.value = text;
  }
};

chrome.action.onClicked.addListener((tab) => {
  if(tab.url.includes("//github.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: replaceLinks
    });
  }
});