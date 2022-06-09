//

import {request} from "@/network/request";

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'

  })
}


//面向网络请求对象封装
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discount
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop {
  constructor(shopinfo) {
    this.logo = shopinfo.shopLogo;
    this.name = shopinfo.name;
    this.score = shopinfo.score;
    this.fans = shopinfo.cFans;
    this.sells = shopinfo.cSells;
    this.goodsCount = shopinfo.cGoods;
  }
}

export class detailInfo{
  constructor(info) {
    this.desc = info.desc
    this.detailImage = info.detailImage
  }
}

export class GoodsPara{
  constructor(info, rule) {
    //注：images可能没有值（某些商品有值，某些没有值）
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
