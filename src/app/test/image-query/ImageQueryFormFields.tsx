'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { isDev } from '@/config';

import { TFormType } from './ImageQueryFormDefinitions';

interface TImageQueryFormFieldsProps {
  form: TFormType;
}

export function ImageQueryFormFields(props: TImageQueryFormFieldsProps) {
  const { form } = props;

  const { register } = form;

  return (
    <ScrollArea
      className={cn(
        isDev && '__ImageQueryFormFields_Scroll', // DEBUG
        'flex flex-col',
      )}
      viewportClassName={cn(
        isDev && '__ImageQueryFormFields_ScrollViewport', // DEBUG
        'px-4 py-2 [&>div]:!flex [&>div]:flex-col [&>div]:gap-4 [&>div]:flex-1',
      )}
    >
      {/* XXX: Model field isn't used here: Only GigaChat model is supported for image queries
      <div className="flex flex-col gap-1">
        <label htmlFor="model" className="block font-medium opacity-50">
          AI Model
        </label>
        <select
          {...register('model')}
          id="model"
          className="focus:ring-primary-500 w-full appearance-none rounded border border-gray-500/20 px-3 py-2 text-gray-100 transition focus:ring-2 focus:outline-none"
        >
          {aiClientTypes.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>
      */}

      {/*
        <div className="flex flex-col gap-1">
          <label htmlFor="requestName" className="block font-medium opacity-50">
            Request Name (optional)
          </label>
          <input
            id="requestName"
            type="text"
            value={requestName}
            onChange={(e) => setRequestName(e.target.value)}
            // required
            className="w-full rounded border border-gray-500/20 px-3 py-2 transition focus:ring-2 focus:ring-primary-500 focus:outline-none"
          />
        </div>
        */}

      <div className="flex flex-col gap-1">
        <label htmlFor="systemQueryText" className="block font-medium opacity-50">
          System Query Text
        </label>
        <textarea
          {...register('systemQueryText')}
          id="systemQueryText"
          rows={5}
          className="focus:ring-primary-500 w-full rounded border border-gray-500/20 px-3 py-2 transition focus:ring-2 focus:outline-none"
          placeholder="Provide the context, personality, and rules for the entire interaction. The system prompt is typically sent only once at the beginning."
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="userQueryText" className="block font-medium opacity-50">
          User Query Text
        </label>
        <textarea
          {...register('userQueryText')}
          id="userQueryText"
          rows={5}
          className="focus:ring-primary-500 w-full rounded border border-gray-500/20 px-3 py-2 transition focus:ring-2 focus:outline-none"
          placeholder="User placeholder query text"
        />
      </div>
    </ScrollArea>
  );
}
