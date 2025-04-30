'use client';
import FormInput from '@/components/Form/FormInput';
import { SubmitButton } from '@/components/Form/Buttons';
import FormContainer from '@/components/Form/FormContainer';
import { createBookAction } from '@/utils/actions';
import ImageInput from '@/components/Form/ImageInput';
import TextAreaInput from '@/components/Form/TextAreaInput';
import CheckboxInput from '@/components/Form/CheckBoxInput';
import PriceInput from '@/components/Form/PriceInput';
import { SelectInput } from '@/components/Form/SelectInput';
import { useState } from 'react';

const statusOptions = [
  { label: 'نو', value: 'NEW' },
  { label: 'خیلی خوب', value: 'VERY_GOOD' },
  { label: 'قابل قبول', value: 'ACCEPTABLE' },
];
const categories = [
  { label: 'ادبیات و داستان', value: 'LITERATURE_AND_FICTION' },
  { label: 'روانشناسی و خودیاری', value: 'PSYCHOLOGY_AND_SELF_HELP' },
  { label: 'فلسفه و اندیشه', value: 'PHILOSOPHY_AND_THOUGHT' },
  { label: 'تاریخ و سیاست', value: 'HISTORY_AND_POLITICS' },
  { label: 'علمی و آموزشی', value: 'SCIENCE_AND_EDUCATION' },
  { label: 'هنر و سینما', value: 'ART_AND_CINEMA' },
  { label: 'اقتصاد و کسبوکار', value: 'ECONOMICS_AND_BUSINESS' },
  { label: 'مذهبی و دینی', value: 'RELIGIOUS_AND_SPIRITUAL' },
  { label: 'کودک و نوجوان', value: 'CHILDREN_AND_YOUNG_ADULT' },
  { label: 'سفر و جغرافیا', value: 'TRAVEL_AND_GEOGRAPHY' },
  { label: 'ورزش و سلامتی', value: 'SPORTS_AND_HEALTH' },
  { label: 'شعر و ادبیات کلاسیک', value: 'POETRY_AND_CLASSICAL_LITERATURE' },
  { label: 'تکنولوژی و برنامهنویسی', value: 'TECHNOLOGY_AND_PROGRAMMING' },
  { label: 'محیط زیست و طبیعت', value: 'ENVIRONMENT_AND_NATURE' },
];

function CreateBookPage() {
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");

  return (
    <section dir="rtl" className="md:w-[70%] mx-auto">
      <h1 className="text-2xl font-semibold mb-8">ایجاد کتاب جدید</h1>
      <div className="border-2 p-8 rounded-md">
        <FormContainer action={createBookAction}>
          <div className="grid gap-4 md:grid-cols-3">
            <FormInput type="text" name="title" label="عنوان کتاب" />
            <FormInput type="number" name="edition" label="چاپ" />
            <FormInput type="text" name="author" label="نویسنده" />
            <FormInput type="number" name="isbn" label="شابک (ISBN)" />
            <FormInput type="text" name="publisher" label="ناشر" />
            <FormInput type="number" name="edition" label="چاپ/نسخه" />

            <SelectInput
              name='category'
              label="دسته بندی"
              options={categories}
              placeholder="انتخاب دسته بندی"
              value={category}
              onValueChange={setCategory}
            />

            <SelectInput
              name='condition'
              label="وضعیت کتاب"
              options={statusOptions}
              placeholder="انتخاب وضعیت"
              value={condition}
              onValueChange={setCondition}
            />

            <FormInput type="text" name="language" label="زبان" />
            <FormInput type="number" name="pageCount" label="تعداد صفحات" />
            <FormInput type="text" name="location" label="شهر" />
            <PriceInput name="dailyPrice" label="قیمت روزانه (تومان)" />
            <PriceInput name="deposit" label="مبلغ ودیعه (تومان)" />

            <ImageInput name="images" label="تصاویر کتاب" />
            <CheckboxInput name="featured" label="نمایش ویژه" />
          </div>

          <TextAreaInput
            name="description"
            labelText="توضیحات کتاب"
          />

          <SubmitButton text="ثبت کتاب" className="mt-8 w-full md:w-auto" />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateBookPage;  