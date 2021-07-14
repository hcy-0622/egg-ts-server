import { Controller } from 'egg';
import userRule from '../validate/userRule';

const path = require('path');
const fs = require('fs');
const xlsx = require('node-xlsx');
export default class UserController extends Controller {
  public async getAll() {
    try {
      const result = await this.ctx.service.user.getList(this.ctx.query);
      this.ctx.success(result);
    } catch (e) {
      this.ctx.error(500, e.message);
    }
  }

  public async create() {
    const data = this.ctx.request.body;
    try {
      this.ctx.validate(userRule(1), data);
      const result = await this.ctx.service.user.create(data);
      this.ctx.success(result);
    } catch (e) {
      if (e.errors) {
        this.ctx.error(400, e.errors);
      } else {
        this.ctx.error(400, e.message);
      }
    }
  }

  public async update() {
    const id = this.ctx.params.id;
    const data = this.ctx.request.body;
    try {
      this.ctx.validate(userRule(0), data);
      const result = await this.ctx.service.user.update(id, data);
      this.ctx.success(result);
    } catch (e) {
      if (e.errors) {
        this.ctx.error(400, e.errors);
      } else {
        this.ctx.error(400, e.message);
      }
    }
  }

  public async delete() {
    const id = this.ctx.params.id;
    try {
      const result = await this.ctx.service.user.delete(id);
      this.ctx.success(result);
    } catch (e) {
      this.ctx.error(400, e.message);
    }
  }

  public async uploadAvatar() {
    const file = this.ctx.request.files[0];
    // 2.生成一个独一无二的文件名称
    const filename =
      this.ctx.helper.encryptText(file.filename + Date.now()) +
      path.extname(file.filename);
    // 3.生成存储文件的路径
    let filepath = path.join('/public/upload', filename);
    const fullPath = path.join(this.config.baseDir, 'app', filepath);
    // 4.写入文件
    const readStream = fs.readFileSync(file.filepath);
    fs.writeFileSync(fullPath, readStream);
    // 5.返回存储图片的路径
    const prefix = 'http://127.0.0.1:7001';
    filepath = prefix + filepath.replace(/\\/g, '/');
    this.ctx.success(filepath);
  }

  public async importUsers() {
    let transaction;
    try {
      const file = this.ctx.request.files[0];
      const sheets = xlsx.parse(fs.readFileSync(file.filepath));
      const sheet1 = sheets.length ? sheets[0] : null;
      const sheetData = sheet1 ? sheet1.data : [];
      const users: any[] = [];
      transaction = await this.ctx.model.transaction();
      for (let i = 1; i < sheetData.length; i++) {
        const columnTitles = sheetData[0];
        const columnValues = sheetData[i];
        const user = {};
        for (let j = 0; j < columnTitles.length; j++) {
          user[columnTitles[j]] = columnValues[j];
        }
        await this.ctx.service.user.create(user);
        users.push(user);
      }
      await transaction.commit();
      this.ctx.success(users);
    } catch (e) {
      await transaction.rollback();
      this.ctx.error(500, e.message);
    }
  }

  public async exportUsers() {
    const users = await this.ctx.service.user.getAll();
    const user = users.length ? users[0].dataValues : null;
    const data: any[] = [];
    if (user) {
      const columnTitles = Object.keys(user);
      data.push(columnTitles);
      users.forEach(u => {
        const temp: any[] = [];
        columnTitles.forEach(k => {
          temp.push(u[k]);
        });
        data.push(temp);
      });
      const buffer = xlsx.build([{ name: '用户信息', data }]);
      this.ctx.set('Content-Type', 'application/vdn.ms-excel');
      this.ctx.attachment('用户信息.xls');
      this.ctx.body = buffer;
    } else {
      //
    }
  }
}
