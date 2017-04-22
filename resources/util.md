fa-info-circle - info button
fa-exclamation-triangle - warning triangle
fa-times-circle - error, don't
fa-check-circle - tick, do, success
fa-bell - attention?

http://www.hongkiat.com/blog/css-reflection/ reflection for icons

info boxes:

<span class="alert-box error">
    <span class="alert-icon" ><i class="fa fa-times-circle" aria-hidden="true"></i></span>
    <span class="alert-message">Write your error message here.</span>
</span>

<span class="alert-box success">
    <span class="alert-icon" ><i class="fa fa-check-circle" aria-hidden="true"></i></span>
    <span class="alert-message">Write your success message here.</span>
</span>

<span class="alert-box warning">
    <span class="alert-icon" ><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span>
    <span class="alert-message">Write your warning message here.</span>
</span>

<span class="alert-box notice">
    <span class="alert-icon" ><i class="fa fa-info-circle" aria-hidden="true"></i></span>
    <span class="alert-message">Write your notice message here.</span>
</span>


syntax highlighting:

{% highlight python linenos %}
{% endhighlight %}

toc on right:

{::options parse_block_html="true" /}
<div class="postBody">
{::options parse_block_html="true" /}
<div class="tocContainer">
<h2 class="contents">Contents</h2>
1. TOC
{:toc}
</div>
</div>