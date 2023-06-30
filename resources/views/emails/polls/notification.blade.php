<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="background:rgb(224, 224, 224);box-sizing:border-box">
    <div style="margin:30px 50px;background:white;box-sizing:border-box;border-bottom:50px solid #373546">
        <!-- header -->
        <div style="background:#373546;padding:30px 30px;max-width:100%">
            {{-- <img src="{{ $message->embed(asset('storage/app-logo-sm.png')) }}" width="150" /> --}}
            <h2 style="color: white">Bukidnon Evoting System</h2>
        </div>
        <div style="margin-top: 20px;padding:35px;">
            <h1 style="font-family:sans-serif">{{ $poll->title }}</h1>
            <h3 style="font-family:sans-serif;font-weight:200">
                Hello {{ $user->firstname }} {{ $user->lastname }}, the poll has officially closed and the final result
                are out now!
            </h3>
            <br>
            <a href="{{ $voting_link }}"
                style="background:#5D30BE;padding:12px 15px;border-radius:5px;color:white;font-family:sans-serif;text-decoration:none;">
                See result here
            </a>
        </div>
        <br>
        <br>
        <br>
    </div>
</body>

</html>
