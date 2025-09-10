'use client';

import React from 'react';

import { aiClientTypes } from '@/lib/types/TAiClientType';

import { TFormType } from './QueryFormDefinitions';

interface TQueryFormFieldsProps {
  form: TFormType;
}

export function QueryFormFields(props: TQueryFormFieldsProps) {
  const { form } = props;

  const { register } = form;

  return (
    <>
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
        />
      </div>
    </>
  );
}
