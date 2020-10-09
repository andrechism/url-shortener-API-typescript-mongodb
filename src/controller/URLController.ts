import { Request, response, Response } from 'express';
import shortId from 'shortid';
import { config } from '../config/Constants';
import { URLModel } from '../database/model/URL';

export class URLController {
  public async shorten(req: Request, response: Response): Promise<void> {
    // Verificar se a URL já existe
    const { originURL } = req.body;
    const url = await URLModel.findOne({ originURL });
    if(url) {
      response.json(url);
      return;
    }

    // Criar o hash pra essa URL
    const hash = shortId.generate();
    const shortURL = `${config.API_URL}/${hash}`;
    
    // Salvar a URL no DB
    const newURL = await URLModel.create({ hash, shortURL, originURL });
    
    // Retornar a URL salva
    response.json({ newURL });
  }

  public async redirect(req: Request, response: Response): Promise<void> {
    // Pegar o hash da URL
    const { hash } = req.params;
    const url = await URLModel.findOne({ hash });

    if(url) {
      response.redirect(url.originURL);
      return;
    }

    response.status(400).json({ error: 'URL not found' });
  }
}