@extends('layouts.app')

@section('content')
    <category-list-component :categories='{{$categories}}' ></category-list-component>
@endsection