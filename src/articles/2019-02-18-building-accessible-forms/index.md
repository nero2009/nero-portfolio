---
path: /building-accessible-forms
date: 2019-02-18
title: Building Accessible(A11y) Forms
author: Nero Adaware
description: According to [Wikipedia](https://en.wikipedia.org/wiki/Accessibility), It is the design of products, devices, services or environments, for people with disabilities. Accessibility in software...
---

### What is Accessibility(a11y)?

According to [Wikipedia](https://en.wikipedia.org/wiki/Accessibility), It is the design of products, devices, services or environments, for people with disabilities. Accessibility in software development is simply building applications that are usable by everyone.

This might be the first time you have heard or read about accessibility in relation to software development or you might have heard about it but you haven't really looked into it, Accessibility is an important part of any application you are building. It shouldn't be some feature but should be a standard when building web applications because it is important the web remains equally accessible to everyone irregardless of their abilities, disabilities or language. Before now I haven't been building the most accessible web applications and I will like to apologize to anybody who had to use my terrible applications. Making your web applications accessible is not difficult to implement, it just requires you to use Semantic HTML in most cases.

So in this article I will briefly explain how to make your (terrible) forms accessible.

#### Labeling form controls.

This can be done using the label element `<label>`. Form label are important because they tell users what to input in that form control, imagine a form without any labels, how would you know what you need to enter into that field. You might be thinking "What of placeholders?", placeholders are not replacements for `label` because screen readers do not treat placeholder text like labels and placeholder text are not widely supported by assistive technologies.

So it is important to provide labels for all form controls in your form, this includes text inputs, checkboxes, radio buttons e.t.c. Simply putting a label above/below a form control is not enough, Sematic HTML provides a way for us to associate a label with a particular form control, to do this the `Id` of form control must match the `for` attribute of the label.

https://codepen.io/finallynero/pen/KbRJry

The above demo shows how to label form controls. You might not have noticed but the label acts as a clickable area which focuses the form control.

#### Grouping form controls.

It is important to group related form fields because it is easier for users to understand the form and also enter the appropriate values.
Take a look at the example below

```html
<form>
  <p>Do you prefer remote work</p>

  <input type="radio" id="yes" /> <label for="yes">Yes</label>

  <input type="radio" id="no" /> <label for="no">No</label>
</form>
```

Visually it looks like there is nothing wrong with that form but if you use a screen reader to navigate the form you will hear the form labels "Yes" or "No" but you won't know what question is being asked.

You can easily group related form fields using the `fieldset` element and the `legend` element as a title for that group.

https://codepen.io/finallynero/pen/RvyRQE

This is just an introduction to making forms accessible, you can get more information from the below links

[W3C Web Accessibility Initiative](https://www.w3.org/WAI/)

[Web Accessibility in Mind ](https://webaim.org/techniques/forms/)

[a11ymatters](https://www.a11ymatters.com/)
