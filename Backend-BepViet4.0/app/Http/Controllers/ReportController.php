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

    public function create(Request $request){
        $report = Report::create([
            'post_id' => $request->post_id,
            'user_id' =>$request->user_id,
        ]);
        return response()->json(['message' => 'Báo cáo thành công']);
    }
}
