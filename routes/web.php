<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PollController;
use App\Http\Controllers\ProfileController;
use App\Models\Poll;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [HomeController::class, 'about'])->name('about');
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');
Route::get('/{status}/error', [HomeController::class, 'error'])->name('error');

Route::prefix('/')->group(function () {
    Route::get('/create-poll', [HomeController::class, 'create_poll'])->name('create-poll');
    Route::get('/new-poll', [HomeController::class, 'new_poll'])->name('new-poll');
    Route::get('/profile/view', [HomeController::class, 'profile'])->name('profile');
})->middleware(['auth','verified']);

Route::middleware(['auth','check.poll.deadline'])->prefix('/polls')->group(function () {
    Route::get('/{code}/vote', [PollController::class, 'voting'])->name('voting');
    Route::get('/{code}/myvote', [PollController::class, 'myVote'])->name('myvote');
    Route::get('/{code}/manage', [PollController::class, 'manage'])->name('manage_poll');
    Route::get('/{id}/end', [PollController::class, 'endPoll'])->name('endPoll');
    Route::get('/{code}/edit', [PollController::class, 'edit'])->name('edit_poll');
    Route::get('/{code}/delete', [PollController::class, 'delete'])->name('delete_poll');
    Route::get('/{code}/result', [PollController::class, 'result'])->name('result');
    Route::get('/404', [PollController::class, 'notFound'])->name('poll-not-found');
    Route::get('/{code}/join', [PollController::class, 'join'])->name('join_poll');
    Route::get('/{code}/statistics', [PollController::class, 'statistics'])->name('statistics');
});

Route::get('/polls/voter/{code}/', [PollController::class, 'voter'])->name('voter_poll');
Route::get('/polls/{code}/voters', [PollController::class, 'manageVoters'])->name('poll_voters')->middleware(['ensure_poll_host','auth']);


Route::get('/auth-redirect', function(){
    return redirect(route('login'))->with('error','You need to login first!');
})->name('auth.redirect');
Route::get('/dashboard', [HomeController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
