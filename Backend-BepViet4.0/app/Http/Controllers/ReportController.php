<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;

class ReportController extends Controller
{
    public function destroy($id){
        $report = Report::findOrFail($id);
        $report->delete();
        return response()->json(['message' => 'Xóa report thành công']);
    }
}
