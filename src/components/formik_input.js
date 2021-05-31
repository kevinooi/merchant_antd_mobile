import React from "react"
import {
  InputItem,
  Radio,
  Checkbox,
  DatePicker,
  Picker,
  TextareaItem,
  List,
  Button,
} from "antd-mobile"

const RadioItem = Radio.RadioItem
const CheckboxItem = Checkbox.CheckboxItem
const AgreeItem = Checkbox.AgreeItem

const MyCheckboxList = (props) => (
  <List renderHeader={() => props.title}>
    {props.data.map((item) => (
      <CheckboxItem
        key={item.label + item.value}
        onChange={() => props.onChange(item.value)}
      >
        {item.label}
      </CheckboxItem>
    ))}
  </List>
)
const MyRadioList = (props) => (
  <List renderHeader={() => props.title}>
    {props.data.map((item) => (
      <RadioItem
        key={item.label + item.value}
        checked={props.value === item.value}
        onChange={() => props.onChange(item.value)}
      >
        {item.label}
      </RadioItem>
    ))}
  </List>
)
export const MyInputItem = (props) => (
  <>
    {props.label ? (
      <InputItem
        type={props.type}
        name={props.name}
        onChange={(value) => props.onChange(value)}
        onBlur={props.onBlur}
        value={props.value}
        error={props.error}
        extra={props.extra}
      >
        <span>{props.label}</span>
        {props.compulsary && <span style={{ color: "red" }}>{` *`}</span>}
      </InputItem>
    ) : (
      <InputItem
        type={props.type}
        name={props.name}
        onChange={(value) => props.onChange(value)}
        onBlur={props.onBlur}
        value={props.value}
        error={props.error}
        extra={props.extra}
      />
    )}
  </>
)
export const MySimplePicker = (props) => (
  <Picker
    value={props.value}
    data={props.data}
    cascade={false}
    className={props.className}
    onOk={(val) => props.onOk(val)}
    okText="Submit"
    dismissText="Cancel"
    extra="&nbsp;"
    format={(labels) => {
      return `${labels.join("")}°C`
    }}
  >
    <List.Item arrow="horizontal">
      {props.label}
      {props.compulsary && <span style={{ color: "red" }}>{` *`}</span>}
    </List.Item>
  </Picker>
)
const MyDatePicker = (props) => (
  <DatePicker
    mode={props.mode}
    title={props.title}
    extra={props.extra}
    value={props.value}
    minDate={props.minDate}
    maxDate={props.maxDate}
    onChange={props.onChange}
    onOk={props.onOk}
    onDismiss={props.onDismiss}
  >
    <List.Item arrow="horizontal">{props.label}</List.Item>
  </DatePicker>
)
const MyTextArea = (props) => (
  <TextareaItem
    title={props.title}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
    onBlur={props.onBlur}
    onFocus={props.onFocus}
    autoHeight
    count={props.count}
  />
)
const SubmitButton = (props) => (
  <button className="my-submit-button" type="submit" disabled={props.disabled}>
    {props.children}
  </button>
)

const MyErrorItem = (props) =>
  props.touched && props.errors ? (
    <List.Item style={{ backgroundColor: "#eee" }}>
      <span style={{ color: "red", fontSize: ".7rem" }}>* {props.errors}</span>
    </List.Item>
  ) : null

// HOC ERROR IN COMPONENT
function HOCErrorInItem(NormalComponent, ErrorComponent) {
  return class HOC extends React.Component {
    render() {
      return (
        <div>
          <NormalComponent {...this.props} />
          <ErrorComponent
            touched={this.props.touched}
            errors={this.props.errors}
          />
        </div>
      )
    }
  }
}
const CheckboxWithError = HOCErrorInItem(MyCheckboxList, MyErrorItem)
const RadioWithError = HOCErrorInItem(MyRadioList, MyErrorItem)
const SimplePickerWithError = HOCErrorInItem(MySimplePicker, MyErrorItem)
const InputWithError = HOCErrorInItem(MyInputItem, MyErrorItem)
const DatePickerWithError = HOCErrorInItem(MyDatePicker, MyErrorItem)
const TextAreaWithError = HOCErrorInItem(MyTextArea, MyErrorItem)

export {
  CheckboxWithError,
  RadioWithError,
  SimplePickerWithError,
  InputWithError,
  DatePickerWithError,
  TextAreaWithError,
  SubmitButton,
}
