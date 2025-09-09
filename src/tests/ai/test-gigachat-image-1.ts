/* eslint-disable no-debugger, no-console */

import * as fs from 'fs';
import * as path from 'path';
import { detectImage, GigaChat } from 'gigachat';
import { ChatCompletion, WithXHeaders } from 'gigachat/interfaces';

import { GIGACHAT_CREDENTIALS, isDev } from '@/config/env';
import { getHttpsAgent } from '@/lib/ai/getHttpsAgent';

import savedResult from './test-gigachat-image-1-result-01.json';

type TGigaChatRes = ChatCompletion & WithXHeaders;

const __debugUseSavedResult = true && isDev;

async function testClient() {
  try {
    // @see https://developers.sber.ru/docs/ru/gigachat/guides/images-generation
    const gigaClient = new GigaChat({
      credentials: GIGACHAT_CREDENTIALS,
      httpsAgent: getHttpsAgent(),
    });
    let gigaRes: TGigaChatRes | undefined;
    if (__debugUseSavedResult) {
      gigaRes = savedResult as TGigaChatRes;
    } else {
      gigaRes = await gigaClient.chat({
        messages: [
          {
            role: 'system',
            content: 'Ты — Василий Кандинский',
          },
          {
            role: 'user',
            content: 'Нарисуй розового кота',
          },
        ],
        function_call: 'auto',
      });
    }

    const { choices } = gigaRes;
    const gigaResJson = JSON.stringify(gigaRes, null, 2);
    const firstResult = gigaRes.choices[0]?.message.content;
    const tokenUsage = gigaRes.usage;
    // const tokenUsage = res.response_metadata?.tokenUsage;

    const detectedImage = detectImage(firstResult ?? '');
    const image = detectedImage?.uuid && (await gigaClient.getImage(detectedImage.uuid));

    console.log('[testClient] ✅ Success:', {
      image,
      detectedImage,
      choices,
      gigaResJson,
      firstResult,
      tokenUsage,
      gigaRes,
      // res,
    });
    debugger;

    // Save the image, if any...
    if (image) {
      const fileName = 'test-gigachat-image-1-generated.jpg';
      const filePath = path.join(__dirname, fileName);
      fs.writeFile(filePath, image.content, 'binary', (error) => {
        if (!error) {
          console.log('The file has been saved:', fileName, {
            filePath,
            image,
          });
          debugger;
        } else {
          console.error('[test-gigachat-image-1] Image saviong error:', error);
          debugger;
          throw error;
        }
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[testClient] ❌ Error:', message, {
      error,
      errorJson: JSON.stringify(error, null, 2),
    });
    debugger;
    // throw error;
  }
}

testClient();
