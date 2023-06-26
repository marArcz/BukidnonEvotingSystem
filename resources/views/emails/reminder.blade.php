<h1>{{$poll->title}}</h1>
<h2>This is a reminder that the poll is ending on: {{date('M d, Y',strtotime($deadline))}}</h2>
<a href="{{$voting_link}}">Vote Here</a>